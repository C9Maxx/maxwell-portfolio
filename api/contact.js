module.exports = async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  // Server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Maxwell Portfolio <onboarding@resend.dev>',
        to: ['chuksmaxwell91@gmail.com'],
        reply_to: email,
        subject: `\u2709 New message from ${name} \u2014 Maxwell Portfolio`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f5f0e8;border-radius:8px;">
            <div style="border-bottom:2px solid #C84B31;padding-bottom:16px;margin-bottom:24px;">
              <h2 style="font-size:22px;color:#0f0f0f;margin:0;">New Portfolio Message</h2>
              <p style="color:#888;font-size:12px;margin:4px 0 0;font-family:monospace;letter-spacing:1px;text-transform:uppercase;">via Maxwell Chukwuebuka Portfolio</p>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #ddd;color:#888;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;width:90px;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #ddd;font-weight:600;color:#0f0f0f;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #ddd;color:#888;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #ddd;">
                  <a href="mailto:${email}" style="color:#C84B31;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;color:#888;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Message</td>
                <td style="padding:16px 0;line-height:1.75;color:#333;white-space:pre-wrap;">${message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</td>
              </tr>
            </table>
            <div style="margin-top:24px;padding:14px 16px;background:#fff;border-left:3px solid #C84B31;border-radius:2px;">
              <p style="margin:0;font-size:12px;color:#888;font-family:monospace;">Hit reply to respond directly to ${name}.</p>
            </div>
            <p style="margin-top:20px;font-size:11px;color:#bbb;font-family:monospace;text-align:center;">Sent from maxwellchukwuebuka.dev contact form</p>
          </div>
        `
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const errData = await response.json().catch(() => ({}));
    console.error('Resend error:', errData);
    return res.status(500).json({ error: errData.message || 'Failed to send email.' });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
