export default async (req) => {
    const url = new URL(req.url);
    let path = url.pathname;
    const prefix = "/.netlify/functions/tg";
    if (path.startsWith(prefix)) path = path.slice(prefix.length);
    const target = "https://api.telegram.org" + path + url.search;
    try {
          const resp = await fetch(target, {
                  method: req.method,
                  headers: { "Content-Type": req.headers.get("content-type") || "application/json" },
                  body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
                  duplex: "half",
          });
          return new Response(resp.body, { status: resp.status, headers: { "Content-Type": resp.headers.get("content-type") || "application/json" } });
    } catch (e) {
          return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 502, headers: { "Content-Type": "application/json" } });
    }
};
export const config = { path: "/bot*" };
