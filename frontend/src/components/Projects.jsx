import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    icon: '📄',
    banner: 'b1',
    featured: true,
    type: 'Generative AI · Full Stack',
    name: 'In2Peta — AI PDF Learning Platform',
    desc: 'An AI-powered PDF learning platform that allows users to upload documents and ask context-aware questions using Google Gemini.',
    stack: ['React', 'FastAPI', 'Python', 'Google Gemini'],
    link: 'https://github.com/Kajal3245/AI-PDF-Learning-Platform',
  },
  {
    icon: '🎙️',
    banner: 'b2',
    featured: false,
    type: 'Generative AI · Full Stack',
    name: 'FluentFace AI — English Speaking Tutor',
    desc: 'An AI English speaking tutor providing speech recognition, grammar correction, pronunciation feedback, voice responses, and follow-up questions.',
    stack: ['React', 'FastAPI', 'Python', 'Google Gemini'],
    link: 'https://github.com/Kajal3245/FluentFaceAI',
  },
  {
    icon: '👵',
    banner: 'b3',
    featured: false,
    type: 'Mobile · Application Development',
    name: 'ElderCare Guardian',
    desc: 'An application focused on providing technology-based assistance and safety-focused features for elderly users.',
    stack: ['Android', 'Java', 'Firebase'],
    link: 'https://github.com/Kajal3245/ElderCare-Guardian',
  },
  {
    icon: '🔐',
    banner: 'b1',
    featured: false,
    type: 'Federated Learning · Research',
    name: 'Diabetes Detection using Federated Learning + Blockchain',
    desc: 'A privacy-preserving healthcare system using federated learning for distributed diabetes prediction and blockchain for secure model-update logging.',
    stack: ['Python', 'Federated Learning', 'Neural Networks', 'Blockchain'],
    link: 'https://github.com/Kajal3245/Federated-Learning-Healthcare',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref}>
      <div className="section-inner">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .8 }}
        >
          <div>
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">Featured Projects</h2>
          </div>

          <a
            href="https://github.com/Kajal3245"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{
              fontSize: '.78rem',
              fontFamily: 'Share Tech Mono,monospace',
              letterSpacing: '.1em'
            }}
          >
            View All →
          </a>
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              className={`proj-card${p.featured ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: .8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className={`proj-banner ${p.banner}`}>
                <span className="proj-icon">{p.icon}</span>
              </div>

              <div className="proj-body">
                <div className="proj-type">
                  {p.type}
                </div>

                <div className="proj-name">
                  {p.name}
                </div>

                <p className="proj-desc">
                  {p.desc}
                </p>

                <div className="proj-footer">
                  <div className="proj-stack">
                    {p.stack.map(s => (
                      <span className="stack-tag" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link"
                  >
                    ↗ View
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}