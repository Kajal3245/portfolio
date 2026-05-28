import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timeline = [
  {
    date: 'May 2025 — July 2025',
    role: 'Summer Research Intern',
    org: 'Indian Institute of Technology (ISM) Dhanbad · Onsite',
    desc: 'Built a Python-based Federated Learning model for a Diabetes Detection System using a neural network architecture that achieved 92% accuracy while ensuring full data privacy. Implemented data preprocessing for critical medical attributes (glucose, BMI, blood pressure, age) and the FedAvg algorithm, improving data privacy by 100% and model integrity by 100% over centralized baselines. Trained on distributed medical data across multiple clients with consistent prediction reliability. Integrated a Blockchain-based logging system for secure model updates with transaction finality of <5 seconds.',
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="exp-section" ref={ref}>
      <div className="section-inner">
        <div className="exp-grid">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label">Journey</div>
            <h2 className="section-title" style={{ marginBottom: '1.2rem' }}>
              Experience &amp;<br />Education
            </h2>
            <p className="about-text">
              Combining rigorous academic research with industry experience
              to build AI systems that genuinely move the needle.
            </p>
          </motion.div>

          <div className="timeline">
            {timeline.map((t, i) => (
              <motion.div
                key={t.role}
                className="tl-item"
                initial={{ opacity: 0, x: 32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: .8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="tl-dot" />
                <div className="tl-date">{t.date}</div>
                <div className="tl-role">{t.role}</div>
                <div className="tl-org">{t.org}</div>
                <p className="tl-desc">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
