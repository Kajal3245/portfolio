import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import aboutImg from '../assets/about.jpg'
import resumePdf from '../assets/Kajal_Resume.pdf'

const tags = ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'MLOps', 'Research', 'Python', 'PyTorch']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const left = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: .9, ease: [0.16, 1, 0.3, 1] } } }
  const right = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: .9, ease: [0.16, 1, 0.3, 1], delay: .15 } } }

  return (
    <section id="about" ref={ref}>
      <div className="section-inner">
        <div className="about-wrap">
          <motion.div className="about-img-col" variants={left} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="about-img-frame">
              <div className="bracket tl" /><div className="bracket tr" />
              <div className="bracket bl" /><div className="bracket br" />
              <img
                src={aboutImg}
                alt="Profile"
                className="about-photo"
              />
            </div>
            <div className="about-badge">
              <span className="badge-n">7.14</span>
              <span className="badge-t">CGPA</span>
            </div>
          </motion.div>

          <motion.div variants={right} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="section-label">About Me</div>
            <h2 className="section-title" style={{ marginBottom: '1.4rem' }}>
              I understand data.<br />I question data.<br />I ship futures.
            </h2>
            <p className="about-text">


              I am a 3rd Year B.Tech student passionate about Data Science, AI, and Web Development. I enjoy learning new technologies and building projects related to Machine Learning and Data Analysis.
            </p>
            <p className="about-text">
              Currently, I am improving my programming and problem-solving skills while working on real-world projects.
            </p>
            <div className="tags">
              {tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="resume-btn-wrap">
              <a href={resumePdf} download="Kajal_Resume.pdf" className="btn-resume">
                <span className="btn-resume-icon">⤓</span>
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
