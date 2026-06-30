// Vercel Serverless Function — sends the contact form via Resend.
// Needs the env var RESEND_API_KEY (set in Vercel) and a domain verified
// in Resend so the "from" address can use vitaledge-lab.com.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Vercel parses JSON bodies automatically; fall back to manual parse.
  let data = req.body;
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch (_) { data = {}; }
  }
  data = data || {};

  // Honeypot: bots fill this hidden field — silently accept and drop.
  if (data._honey) { res.status(200).json({ ok: true }); return; }

  const { nombre, empresa, email, telefono, tipo, descripcion, timing } = data;

  if (!nombre || !email || !tipo || !descripcion) {
    res.status(400).json({ error: 'Faltan campos obligatorios.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'El servicio de correo no está configurado.' });
    return;
  }

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const row = (label, value) => value
    ? `<tr><td style="padding:4px 16px 4px 0;color:#6B6358;">${label}</td>` +
      `<td style="padding:4px 0;color:#2B2722;">${esc(value)}</td></tr>`
    : '';

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#2B2722;line-height:1.5;">
      <h2 style="font-weight:400;margin:0 0 12px;">Nueva solicitud de propuesta</h2>
      <table style="border-collapse:collapse;font-size:14px;">
        ${row('Nombre', nombre)}
        ${row('Empresa', empresa)}
        ${row('Email', email)}
        ${row('Teléfono', telefono)}
        ${row('Tipo de proyecto', tipo)}
        ${row('Timing', timing)}
      </table>
      <p style="margin:16px 0 4px;color:#6B6358;font-size:14px;">Descripción del proyecto</p>
      <p style="white-space:pre-wrap;font-size:14px;">${esc(descripcion)}</p>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'VitalEdge Lab <formulario@vitaledge-lab.com>',
        to: ['info@vitaledge-lab.com'],
        reply_to: email,
        subject: `Nueva solicitud de propuesta — ${nombre}`,
        html
      })
    });

    if (!r.ok) {
      const detail = await r.text();
      res.status(502).json({ error: 'No se pudo enviar el correo.', detail });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor.' });
  }
};
