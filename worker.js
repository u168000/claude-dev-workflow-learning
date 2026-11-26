// 台股報價專屬 Proxy（Cloudflare Workers）
// 只允許轉接證交所與 Yahoo 報價網址，避免被他人濫用
export default {
  async fetch(req) {
    const u = new URL(req.url).searchParams.get('url');
    const ok = /^https:\/\/(mis\.twse\.com\.tw|query[12]\.finance\.yahoo\.com)\//;
    if (!u || !ok.test(u)) return new Response('bad url', { status: 400 });
    const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://mis.twse.com.tw/' } });
    return new Response(r.body, { status: r.status, headers: {
      'Content-Type': r.headers.get('Content-Type') || 'application/json',
      'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' } });
  }
};
