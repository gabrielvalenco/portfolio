import { useEffect, useRef } from 'react'
import { heroVideo, type HeroVideo } from '@/data/media'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fundo do palco do hero: o video configurado em data/media.ts ou, sem ele, a animacao WebGL. */
export default function HeroMedia() {
  return heroVideo ? <Video video={heroVideo} /> : <Flow />
}

// Segundos de sobreposicao entre o fim de uma volta e o comeco da outra (igual a transicao de `.stage-media`).
const FADE = 0.9

/**
 * Video gerado por IA nao fecha o ciclo sozinho: em vez de `loop` (que daria um corte seco),
 * duas copias se revezam e a proxima volta entra em fade por cima do fim da anterior.
 */
function Video({ video }: { video: HeroVideo }) {
  const firstRef = useRef<HTMLVideoElement>(null)
  const secondRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const first = firstRef.current
    const second = secondRef.current
    if (!first || !second) return

    const show = () => first.classList.add('is-ready')
    if (first.readyState >= 2) show()
    else first.addEventListener('loadeddata', show, { once: true })

    // Com "reduzir movimento" fica so o primeiro quadro.
    if (reducedMotion()) {
      first.pause()
      return () => first.removeEventListener('loadeddata', show)
    }

    let current = first
    let visible = true
    let raf = 0
    let timer = 0
    const play = (el: HTMLVideoElement) => el.play().catch(() => { /* autoplay bloqueado: fica o quadro parado */ })

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const left = current.duration - current.currentTime
      if (!(left <= FADE)) return
      const prev = current
      const next = current === first ? second : first
      current = next
      next.currentTime = 0
      // A que entra fica por cima; a que sai continua opaca por baixo ate o fade terminar.
      prev.style.zIndex = '-3'
      next.style.zIndex = '-2'
      next.classList.add('is-ready')
      play(next)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        prev.pause()
        prev.classList.remove('is-ready')
      }, FADE * 1000 + 100)
    }
    const sync = () => {
      cancelAnimationFrame(raf)
      if (visible && !document.hidden) {
        play(current)
        raf = requestAnimationFrame(tick)
      } else {
        // Fora da tela ou com a aba oculta o video para: nao gasta bateria nem decodificacao.
        first.pause()
        second.pause()
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting
      sync()
    })
    io.observe(first)
    document.addEventListener('visibilitychange', sync)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      first.removeEventListener('loadeddata', show)
    }
  }, [])

  const sources = (
    <>
      {video.webm && <source src={video.webm} type="video/webm" />}
      <source src={video.mp4} type="video/mp4" />
    </>
  )
  return (
    <>
      <video ref={firstRef} aria-hidden tabIndex={-1} className="stage-media" autoPlay muted playsInline preload="auto" poster={video.poster}>
        {sources}
      </video>
      <video ref={secondRef} aria-hidden tabIndex={-1} className="stage-media" muted playsInline preload="auto">
        {sources}
      </video>
    </>
  )
}

const VERTEX = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'

// Ruido com "domain warping": o campo e dobrado sobre si mesmo duas vezes, o que da o aspecto
// de tinta/seda em movimento. As tres cores da paleta entram por faixas diferentes do campo.
const FRAGMENT = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0., a = .5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= .5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - .5 * u_res) / u_res.y;
  p += (u_mouse - .5) * .18;
  float t = u_time * .055;

  vec2 q = vec2(fbm(p * 1.15 + vec2(0., t)), fbm(p * 1.15 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.35 + 2.8 * q + vec2(1.7, 9.2) + t * 1.5),
                fbm(p * 1.35 + 2.8 * q + vec2(8.3, 2.8) - t * 1.2));
  float f = fbm(p * 1.25 + 3.4 * r);

  vec3 ink = vec3(.039, .039, .067);
  vec3 violet = vec3(.486, .361, 1.);
  vec3 pink = vec3(1., .302, .616);
  vec3 lime = vec3(.776, 1., .227);

  vec3 c = mix(ink, violet, smoothstep(.22, .66, f));
  c = mix(c, pink, smoothstep(.4, .7, r.y) * .9);
  c = mix(c, lime, smoothstep(.5, .7, r.x) * smoothstep(.3, .62, f));

  // Dobras da "seda": sombra nas depressoes e um fio de luz nas cristas.
  float folds = sin((f * 2.2 + r.x + q.y) * 9.);
  c *= .62 + .5 * smoothstep(-.9, .9, folds);
  c += .12 * pow(max(folds, 0.), 12.);

  // Mais luz no canto superior direito, onde nao ha texto.
  c *= .5 + .7 * smoothstep(-.1, 1.1, uv.x * .62 + uv.y * .58);

  c += (hash(gl_FragCoord.xy + fract(u_time) * 91.7) - .5) * .045;
  gl_FragColor = vec4(c, 1.);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/** Tinta eletrica em movimento, desenhada num fragment shader. Sem WebGL, fica o gradiente CSS de `.stage`. */
function Flow() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // Um triangulo que cobre a tela inteira.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const attr = gl.getAttribLocation(program, 'a')
    gl.enableVertexAttribArray(attr)
    gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')

    const still = reducedMotion()
    let raf = 0
    let visible = true
    let lost = false
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    // Comeca num ponto "bonito" do ruido, nao do zero.
    const start = performance.now() - 40_000

    const draw = () => {
      if (lost) return
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    const sync = () => {
      cancelAnimationFrame(raf)
      raf = 0
      if (still) draw()
      else if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    // O desenho e suave por natureza: renderizar em ~60% da resolucao poupa GPU sem perda visivel.
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6
      const w = Math.max(1, Math.round(canvas.clientWidth * scale))
      const h = Math.max(1, Math.round(canvas.clientHeight * scale))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      if (!raf) draw()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    canvas.classList.add('is-ready')

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting
      sync()
    })
    io.observe(canvas)

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = 1 - e.clientY / window.innerHeight
    }
    const onLost = (e: Event) => {
      e.preventDefault()
      lost = true
      cancelAnimationFrame(raf)
      canvas.classList.remove('is-ready')
    }
    document.addEventListener('visibilitychange', sync)
    canvas.addEventListener('webglcontextlost', onLost)
    if (!still) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      canvas.removeEventListener('webglcontextlost', onLost)
      window.removeEventListener('pointermove', onMove)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="stage-media" />
}
