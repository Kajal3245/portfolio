import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = links.map(l => document.getElementById(l.toLowerCase()))
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && window.scrollY >= sections[i].offsetTop - 200) {
          setActive(links[i].toLowerCase()); break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`nav${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-logo">Kajal Kumari</div>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              style={active === l.toLowerCase() ? { color: 'var(--cyan)' } : {}}
            >{l}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-hire">Hire Me</a>
    </motion.nav>
  )
}
