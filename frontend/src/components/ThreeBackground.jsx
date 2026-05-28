import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    let width = window.innerWidth
    let height = window.innerHeight
    let animId

    /* ── Scene / Camera / Renderer ── */
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    /* ── Particles ── */
    const COUNT = 180
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const velocities = []

    const palette = [
      new THREE.Color('#00e5ff'),
      new THREE.Color('#7b2fff'),
      new THREE.Color('#ff2d6e'),
    ]

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      velocities.push({
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.006,
      })
    }

    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    ptGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const ptMat = new THREE.PointsMaterial({
      size: 0.07, vertexColors: true,
      transparent: true, opacity: 0.85,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(ptGeo, ptMat)
    scene.add(points)

    /* ── Connection lines pool ── */
    const MAX_LINES = 600
    const linePositions = new Float32Array(MAX_LINES * 2 * 3)
    const lineColors    = new Float32Array(MAX_LINES * 2 * 3)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 3))
    const lineSegs = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.35,
    }))
    scene.add(lineSegs)

    /* ── Floating rings ── */
    const rings = []
    const ringData = [
      { radius: 1.2, color: '#00e5ff', speed: 0.003, tilt: 0.4 },
      { radius: 2.0, color: '#7b2fff', speed: -0.002, tilt: 1.1 },
      { radius: 2.9, color: '#ff2d6e', speed: 0.0015, tilt: 0.7 },
    ]
    ringData.forEach(({ radius, color, speed, tilt }) => {
      const geo = new THREE.RingGeometry(radius, radius + 0.008, 64)
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = tilt
      mesh.userData = { speed }
      scene.add(mesh)
      rings.push(mesh)
    })

    /* ── DNA helix ── */
    const helixGroup = new THREE.Group()
    helixGroup.position.set(3.5, 0, -3)
    const helixMat = new THREE.MeshBasicMaterial({ color: '#00e5ff', transparent: true, opacity: 0.25 })
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 6
      const geo = new THREE.SphereGeometry(0.025, 6, 6)
      const m1 = new THREE.Mesh(geo, helixMat)
      m1.position.set(Math.cos(t) * 0.4, (i / 60) * 4 - 2, Math.sin(t) * 0.4)
      const m2 = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: '#ff2d6e', transparent: true, opacity: 0.25 }))
      m2.position.set(Math.cos(t + Math.PI) * 0.4, (i / 60) * 4 - 2, Math.sin(t + Math.PI) * 0.4)
      helixGroup.add(m1, m2)
    }
    scene.add(helixGroup)

    /* ── Mouse ── */
    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / width - 0.5) * 2
      mouseY = -(e.clientY / height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    /* ── Animate ── */
    const MAX_DIST = 3.2

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const pos = ptGeo.attributes.position.array
      const col = ptGeo.attributes.color.array

      /* move particles */
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     += velocities[i].x
        pos[i * 3 + 1] += velocities[i].y
        pos[i * 3 + 2] += velocities[i].z
        if (Math.abs(pos[i * 3])     > 11) velocities[i].x *= -1
        if (Math.abs(pos[i * 3 + 1]) >  8) velocities[i].y *= -1
        if (Math.abs(pos[i * 3 + 2]) >  5) velocities[i].z *= -1
      }
      ptGeo.attributes.position.needsUpdate = true

      /* connection lines */
      let lineIdx = 0
      const lp = lineGeo.attributes.position.array
      const lc = lineGeo.attributes.color.array
      for (let i = 0; i < COUNT && lineIdx < MAX_LINES; i++) {
        for (let j = i + 1; j < COUNT && lineIdx < MAX_LINES; j++) {
          const dx = pos[i*3] - pos[j*3]
          const dy = pos[i*3+1] - pos[j*3+1]
          const dz = pos[i*3+2] - pos[j*3+2]
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz)
          if (dist < MAX_DIST) {
            const base = lineIdx * 6
            lp[base]   = pos[i*3];   lp[base+1] = pos[i*3+1]; lp[base+2] = pos[i*3+2]
            lp[base+3] = pos[j*3];   lp[base+4] = pos[j*3+1]; lp[base+5] = pos[j*3+2]
            const alpha = (1 - dist / MAX_DIST) * 0.5
            lc[base]   = col[i*3]*alpha;   lc[base+1] = col[i*3+1]*alpha; lc[base+2] = col[i*3+2]*alpha
            lc[base+3] = col[j*3]*alpha;   lc[base+4] = col[j*3+1]*alpha; lc[base+5] = col[j*3+2]*alpha
            lineIdx++
          }
        }
      }
      /* clear unused slots */
      for (let k = lineIdx * 6; k < MAX_LINES * 6; k++) { lp[k] = 0; lc[k] = 0 }
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate    = true
      lineGeo.setDrawRange(0, lineIdx * 2)

      /* rotate rings */
      rings.forEach(r => { r.rotation.z += r.userData.speed })

      /* spin helix */
      helixGroup.rotation.y += 0.004

      /* camera parallax */
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04
      camera.position.y += (mouseY * 0.4 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    /* ── Resize ── */
    const onResize = () => {
      width  = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="three-canvas" />
}
