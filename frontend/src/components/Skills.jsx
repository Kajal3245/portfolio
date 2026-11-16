import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { icon: ' ', name: 'Generative AI', pct: 90, tech: 'Google Gemini · LLM Applications · Prompt Engineering' },
  { icon: ' ', name: 'Machine Learning', pct: 90, tech: 'Scikit-learn · Supervised Learning · Classification · Feature Engineering' },
  { icon: ' ', name: 'Data Analytics', pct: 88, tech: 'Pandas · NumPy · Matplotlib · Seaborn · Plotly · Power BI · Excel' },
  { icon: ' ', name: 'Web Development', pct: 90, tech: 'React · FastAPI · HTML5 · CSS3 · JavaScript · REST APIs' },
  { icon: ' ', name: 'Programming & Databases', pct: 88, tech: 'Python · Java · C++ · SQL · MySQL' },
  { icon: ' ', name: 'Tools & Development', pct: 85, tech: 'Git · GitHub · VS Code · Jupyter Notebook · Vercel · Railway' },
]

function SkillCard({ skill, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="skill-icon">{skill.icon}</span>
      <div className="skill-name">{skill.name}</div>
      <div className="bar-track">
        <div
          className={`bar-fill${inView ? ' animate' : ''}`}
          style={{ width: `${skill.pct}%`, transitionDelay: `${delay + 0.2}s` }}
        />
      </div>
      <div className="skill-pct">{skill.pct}%</div>
      <div className="skill-tech">{skill.tech}</div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="section-inner">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .8 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>Technical Arsenal</div>
          <h2 className="section-title">Core Competencies</h2>
        </motion.div>
        <div className="skills-grid">
          {skills.map((s, i) => <SkillCard key={s.name} skill={s} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}