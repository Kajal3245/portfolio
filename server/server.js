require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const nodemailer = require('nodemailer')

const app  = express()
const PORT = process.env.PORT || 5001

/* ── Middleware ── */
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

/* ── Nodemailer transporter ──
   Fill in your SMTP credentials in the .env file.
   For Gmail: enable 2FA and create an App Password at
   https://myaccount.google.com/apppasswords
*/
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   // your Gmail address
    pass: process.env.EMAIL_PASS,   // 16-char App Password
  },
})

/* ── POST /api/contact ── */
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  /* Email to portfolio owner */
  const mailToOwner = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:   process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject} — from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#04060f;color:#e8f0ff;padding:2rem;border-radius:8px;">
        <h2 style="color:#00e5ff;font-size:1.4rem;margin-bottom:1rem;">📬 New Portfolio Message</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:.5rem 0;color:#526080;width:90px;vertical-align:top;">Name</td>
            <td style="padding:.5rem 0;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:.5rem 0;color:#526080;vertical-align:top;">Email</td>
            <td style="padding:.5rem 0;"><a href="mailto:${email}" style="color:#00e5ff;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:.5rem 0;color:#526080;vertical-align:top;">Subject</td>
            <td style="padding:.5rem 0;">${subject}</td>
          </tr>
        </table>
        <hr style="border-color:rgba(0,229,255,0.15);margin:1.2rem 0;" />
        <p style="line-height:1.8;white-space:pre-wrap;">${message}</p>
        <hr style="border-color:rgba(0,229,255,0.15);margin:1.2rem 0;" />
        <p style="font-size:.75rem;color:#526080;">Sent from Kajal Kumari Portfolio · ${new Date().toLocaleString()}</p>
      </div>
    `,
  }

  /* Auto-reply to sender */
  const mailToSender = {
    from: `"Kajal Kumari" <${process.env.EMAIL_USER}>`,
    to:   email,
    subject: `Thanks for reaching out, ${name.split(' ')[0]}! 🚀`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#04060f;color:#e8f0ff;padding:2rem;border-radius:8px;">
        <h2 style="color:#00e5ff;">Hey ${name.split(' ')[0]}! 👋</h2>
        <p style="line-height:1.8;color:rgba(232,240,255,0.75);">
          Thanks for reaching out through my portfolio! I received your message about
          "<strong style="color:#e8f0ff;">${subject}</strong>" and will get back to you within 24 hours.
        </p>
        <p style="line-height:1.8;color:rgba(232,240,255,0.75);">
          In the meantime, feel free to check out my GitHub or connect with me on LinkedIn.
        </p>
        <div style="margin:2rem 0;padding:1rem 1.5rem;border-left:3px solid #7b2fff;background:rgba(123,47,255,0.08);">
          <p style="margin:0;font-style:italic;color:rgba(232,240,255,0.6);">"The best models are built by curious minds who refuse to accept the status quo."</p>
        </div>
        <p style="line-height:1.8;color:rgba(232,240,255,0.75);">Cheers,<br/><strong style="color:#00e5ff;">Kajal Kumari</strong><br/>
        <span style="font-size:.8rem;color:#526080;">AI/ML Engineer · Ramgarh Engineering College</span></p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailToOwner)
    await transporter.sendMail(mailToSender)
    return res.json({ success: true, message: 'Email sent successfully!' })
  } catch (err) {
    console.error('Nodemailer error:', err.message)
    return res.status(500).json({ error: 'Failed to send email. Check server logs.' })
  }
})

/* ── Health check ── */
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date() }))

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API running at http://localhost:${PORT}`)
  console.log(`   POST /api/contact  → sends email via Nodemailer`)
  console.log(`   GET  /api/health   → health check\n`)
})
