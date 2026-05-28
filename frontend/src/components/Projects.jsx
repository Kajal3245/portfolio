import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    icon: '🌌', banner: 'b1', featured: true,
    type: 'prediction task · Featured',
    name: 'sonar-rock-vs-mine-prediction',
    desc: 'The project is typically based on the Connectionist Bench (Sonar, Mines vs. Rocks) dataset',
    stack: ['PyTorch', 'Diffusers', 'CUDA', 'FastAPI', 'React'],
    link: 'https://github.com/Kajal3245/sonar-rock-vs-mine-prediction.git',
  },
  {
    icon: '🔬', banner: 'b2', featured: false,
    type: 'Federated Learning · Research',
    name: 'Fake Medical Data Detection using Federated Learning + Blockchain',
    desc: 'A privacy-preserving healthcare system using federated learning and blockchain for secure model training without sharing patient data.',
    stack: ['BERT', 'HuggingFace', 'spaCy'],
    link: 'https://github.com/Kajal3245/Federated-Learning-Healthcare-Blockchain',
  },
  {
    icon: ' ', banner: 'b3', featured: false,
    type: 'Computer Vision',
    name: 'SafeVision — Real-Time Detection',
    desc: 'Multi-class object detection at 30 FPS on edge devices. Deployed in 3 pilot programs across university campuses.',
    stack: ['YOLOv8', 'TensorRT', 'ONNX'],
    link: '#',
  },
  {
    icon: ' ', banner: 'b1', featured: false,
    type: 'Reinforcement Learning',
    name: 'AdaptBot — RL Agent',
    desc: 'PPO-based agent mastering complex game environments. Achieved superhuman performance on 6 Atari games.',
    stack: ['PyTorch', 'Gym', 'RLlib'],
    link: '#',
  },
  {
    icon: ' ', banner: 'b2', featured: false,
    type: 'MLOps',
    name: 'ModelForge — ML Pipeline',
    desc: 'Automated ML pipeline with auto-scaling inference, A/B testing, and drift detection. Serves 10k+ req/day.',
    stack: ['Kubernetes', 'MLflow', 'FastAPI', 'Redis'],
    link: '#',
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
          <a href="#" className="btn-ghost" style={{ fontSize: '.78rem', fontFamily: 'Share Tech Mono,monospace', letterSpacing: '.1em' }}>View All →</a>
        </motion.div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              className={`proj-card${p.featured ? ' featured' : ''}`}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: .8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`proj-banner ${p.banner}`}>
                <span className="proj-icon">{p.icon}</span>
              </div>
              <div className="proj-body">
                <div className="proj-type">{p.type}</div>
                <div className="proj-name">{p.name}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-footer">
                  <div className="proj-stack">
                    {p.stack.map(s => <span className="stack-tag" key={s}>{s}</span>)}
                  </div>
                  <a href={p.link} className="proj-link">↗ View</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
