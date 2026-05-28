import { useEffect, useRef, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const ROLES = [
  'AI / ML Engineer',
  'Federated Learning Engineer',
  'Computer Vision/Neural Network',
  'NLP & Deep Learning Enthusiast',
  'Generative AI Builder',
]

function useTyping(words, speed = 80, pause = 1800) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const word = words[idx % words.length]
    const timeout = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause)
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setIdx(i => i + 1) }
      }
    }, del ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, del, idx, words, speed, pause])
  return text
}

function useCounter(target, duration = 2000) {
  const [val, setVal] = useState(0)
  const start = useRef(null)
  useEffect(() => {
    const step = (ts) => {
      if (!start.current) start.current = ts
      const progress = Math.min((ts - start.current) / duration, 1)
      setVal(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration])
  return val
}

function SplineFallback() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '1rem', color: 'var(--muted)',
      fontFamily: 'Share Tech Mono, monospace', fontSize: '.75rem', letterSpacing: '.15em'
    }}>
      <div style={{ fontSize: '5rem', animation: 'float 3s ease-in-out infinite' }}>🤖</div>
      <span>LOADING 3D SCENE...</span>
      <div style={{
        width: '120px', height: '2px', background: 'var(--bg3)', borderRadius: '1px', overflow: 'hidden'
      }}>
        <div style={{
          height: '100%', background: 'linear-gradient(90deg,var(--cyan),var(--violet))',
          animation: 'loadbar 1.5s ease-in-out infinite'
        }} />
      </div>
      <style>{`
        @keyframes loadbar{0%{width:0%}50%{width:100%}100%{width:0%;margin-left:100%}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      `}</style>
    </div>
  )
}

export default function Hero() {
  const typed = useTyping(ROLES)
  const c1 = useCounter(24)
  const c2 = useCounter(187)
  const c3 = useCounter(8)

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
  const item = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .8, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section className="hero" id="home">
      <motion.div className="hero-left" variants={stagger} initial="hidden" animate="visible">
        <motion.div className="hero-eyebrow" variants={item}>
          AI/ML Engineer &amp; Researcher
        </motion.div>
        <motion.h1 className="hero-name" variants={item}>
          <div className="n1">Kajal</div>
          <div className="n2" data-text="Kumari">Kumari</div>
        </motion.h1>
        <motion.p className="hero-typing" variants={item}>
          $ role --current&nbsp;
          <span className="typed">{typed}</span>
          <span className="cursor-blink">_</span>
        </motion.p>
        <motion.p className="hero-desc" variants={item}>
          I’m especially interested in Artificial Intelligence and modern software development, and I enjoy exploring how data and clean design can create impactful applications.
        </motion.p>
        <motion.div className="hero-btns" variants={item}>
          <a href="#projects" className="btn-primary">View Projects →</a>
          <a href="#contact" className="btn-ghost">Let's Talk</a>
        </motion.div>
        <motion.div className="hero-stats" style={{ marginTop: '3rem', position: 'relative', bottom: 'auto' }} variants={item}>
          <div className="stat-item">
            <span className="stat-num">{c1}+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{c2}+</span>
            <span className="stat-label">Papers Read</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">{c3}</span>
            <span className="stat-label">Competitions</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="spline-wrap">
          <Suspense fallback={<SplineFallback />}>
            <Spline
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </div>
      </motion.div>
    </section>
  )
}
