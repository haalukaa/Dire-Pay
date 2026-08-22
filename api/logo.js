export default async function handler(req, res) {
  try {
    const host = req.headers.host;
    const proto = host && host.includes('localhost') ? 'http' : 'https';
    const html = await fetch(`${proto}://${host}/`, { cache: 'no-store' }).then(r => r.text());
    const match = html.match(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/);
    if (!match) return res.status(404).send('Logo not found');
    const img = Buffer.from(match[1], 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(img);
  } catch (error) {
    res.status(500).send('Logo unavailable');
  }
}
