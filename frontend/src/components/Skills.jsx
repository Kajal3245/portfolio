import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { icon: ' ', name: 'Deep Learning', pct: 92, tech: 'PyTorch · TensorFlow · JAX · Keras' },
  { icon: ' ', name: 'Natural Language Processing', pct: 88, tech: 'Transformers · HuggingFace · LangChain · spaCy' },
  { icon: ' ', name: 'Computer Vision', pct: 85, tech: 'OpenCV · YOLO · Detectron2 · CLIP · ViTs' },
  { icon: ' ', name: 'Python / ML Engineering', pct: 95, tech: 'NumPy · Pandas · Scikit-learn · FastAPI' },
  { icon: ' ', name: 'Cloud & MLOps', pct: 78, tech: 'AWS · GCP · Docker · MLflow · Weights & Biases' },
  { icon: ' ', name: 'Data Science & Research', pct: 90, tech: 'Statistics · Jupyter · SQL · LaTeX · R' },
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
