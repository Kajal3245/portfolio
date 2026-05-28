import { useEffect, useRef } from 'react'
import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  let mx = 0, my = 0, rx = 0, ry = 0

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
    }

    let id
    const lerp = () => {
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      id = requestAnimationFrame(lerp)
    }
    lerp()
    window.addEventListener('mousemove', onMove)

    const enter = () => { dot.classList.add('hover'); ring.classList.add('hover') }
    const leave = () => { dot.classList.remove('hover'); ring.classList.remove('hover') }
    const els = document.querySelectorAll('a, button, .skill-card, .proj-card, input, textarea')
    els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave) })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <div className="grid-bg" />
      <div className="scanlines" />
      <ThreeBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer>
        <span className="footer-txt">© 2025 kajal kumari · Built with passion & caffeine ☕</span>
        <span className="footer-logo"></span>
        <span className="footer-txt">Ramgarh Engineering College,Jharkhand</span>
      </footer>
    </>
  )
}
