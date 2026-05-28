import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const socials = [
  { icon: ' --', label: 'kajalkmari985@gmail.com', href: 'mailto:kajalkmari985@gmail.com' },
  { icon: '--', label: 'linkedin.com', href: 'https://www.linkedin.com/in/kajal-kumari-0717362a7/' },
  { icon: '--', label: 'github.com', href: 'https://github.com/Kajal3245' },

]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="section-inner">
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">Let's Collaborate</div>
            <h2 className="contact-title">
              Ready to build<br /><span>something brilliant?</span>
            </h2>
            <p className="contact-sub">
              Open to research collaborations, internships, full-time roles, and
              interesting AI/ML side projects. Drop me a message — I respond within 24 hours.
            </p>
            <div className="contact-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="social-link" target="_blank" rel="noreferrer">
                  <span className="social-icon">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={submit}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .9, delay: .15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="name">Your Name</label>
                <input id="name" name="name" type="text" placeholder="Jane Smith" required
                  value={form.name} onChange={handle} />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email Address</label>
                <input id="email" name="email" type="email" placeholder="jane@company.com" required
                  value={form.email} onChange={handle} />
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="Research Collaboration / Job Opportunity / ..." required
                value={form.subject} onChange={handle} />
            </div>
            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell me about the opportunity or what you'd like to build together..." required
                value={form.message} onChange={handle} />
            </div>
            <button className="btn-send" type="submit" disabled={sending}>
              {sending ? '⏳  Sending...' : '  Send Message'}
            </button>
            {status === 'success' && (
              <p className="form-status success"> Message sent! I'll get back to you within 24 hours.</p>
            )}
            {status === 'error' && (
              <p className="form-status error"> Something went wrong. Try emailing me directly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
