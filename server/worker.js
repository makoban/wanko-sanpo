/* わんこさんぽ お世話指数ランキングAPI（Cloudflare Worker + D1） */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...CORS },
  });

const clampStr = (s, n) => String(s ?? "").slice(0, n).replace(/[<>&"']/g, "");

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

    /* スコア送信（upsert） */
    if (req.method === "POST" && url.pathname === "/submit") {
      let b;
      try { b = await req.json(); } catch { return json({ error: "bad json" }, 400); }
      const id = clampStr(b.id, 40);
      if (id.length < 8) return json({ error: "bad id" }, 400);
      const name = clampStr(b.name, 12) || "ななしさん";
      const dog = clampStr(b.dog, 12) || "わんちゃん";
      let score = Math.floor(Number(b.score) || 0);
      if (!Number.isFinite(score) || score < 0) score = 0;
      if (score > 999999) score = 999999;
      await env.DB.prepare(
        `INSERT INTO scores (id, name, dog, score, updated) VALUES (?1, ?2, ?3, ?4, ?5)
         ON CONFLICT(id) DO UPDATE SET name=?2, dog=?3, score=?4, updated=?5`
      ).bind(id, name, dog, score, Date.now()).run();
      return json({ ok: true });
    }

    /* トップN（LP用） */
    if (url.pathname === "/top") {
      const n = Math.min(20, Math.max(1, Number(url.searchParams.get("n")) || 10));
      const { results } = await env.DB.prepare(
        `SELECT name, dog, score FROM scores ORDER BY score DESC, updated ASC LIMIT ?1`
      ).bind(n).all();
      const total = (await env.DB.prepare(`SELECT COUNT(*) AS c FROM scores`).first())?.c || 0;
      return json({ top: results, total });
    }

    /* じぶんの順位＋上位との差＋トップ5（ゲーム内用） */
    if (url.pathname === "/rank") {
      const id = clampStr(url.searchParams.get("id"), 40);
      const me = await env.DB.prepare(`SELECT name, dog, score FROM scores WHERE id=?1`).bind(id).first();
      const total = (await env.DB.prepare(`SELECT COUNT(*) AS c FROM scores`).first())?.c || 0;
      const { results: top } = await env.DB.prepare(
        `SELECT name, dog, score FROM scores ORDER BY score DESC, updated ASC LIMIT 5`
      ).all();
      if (!me) return json({ rank: null, total, top });
      const rank = 1 + ((await env.DB.prepare(
        `SELECT COUNT(*) AS c FROM scores WHERE score > ?1`
      ).bind(me.score).first())?.c || 0);
      const above = await env.DB.prepare(
        `SELECT name, score FROM scores WHERE score > ?1 ORDER BY score ASC LIMIT 1`
      ).bind(me.score).first();
      return json({
        rank, total, score: me.score, top,
        gap: above ? above.score - me.score : 0,
        aboveName: above ? above.name : null,
      });
    }

    return json({ error: "not found" }, 404);
  },
};
