// Devolve so o codigo do pais do visitante (cabecalho que a Vercel ja injeta). Nada e guardado.
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  res.status(200).json({ country: req.headers['x-vercel-ip-country'] ?? null })
}
