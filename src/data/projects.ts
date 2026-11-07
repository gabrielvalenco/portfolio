import type { Lang } from '@/i18n/translations'

export type Project = {
  title: string
  desc:  Record<Lang, string>
  href:  string
  live?: string
  repo?: string
  tags?: string[]
  image?: string
}

export const projects: Project[] = [
  {
    title: 'Estante',
    desc: {
      pt: 'Diário de leitura social no estilo Letterboxd, só que para livros: estante, reviews, perfis, clubes de leitura e discussões sem spoiler. Também disponível como app mobile.',
      en: 'A social reading diary in the style of Letterboxd, but for books: shelf, reviews, profiles, reading clubs and spoiler-free discussions. Also available as a mobile app.',
      es: 'Diario de lectura social al estilo Letterboxd, pero para libros: estantería, reseñas, perfiles, clubes de lectura y discusiones sin spoilers. También disponible como app móvil.',
    },
    href: 'https://estante-pink.vercel.app/',
    live: 'https://estante-pink.vercel.app/',
    repo: 'https://github.com/gabrielvalenco/estante',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Expo'],
    image: '/estante.webp',
  },
  {
    title: 'Farol',
    desc: {
      pt: 'O raio-x do seu site em menos de um minuto: análise de performance, SEO e acessibilidade com nota de 0 a 100 e relatório visual em português.',
      en: 'An X-ray of your website in under a minute: performance, SEO and accessibility analysis with a 0 to 100 score and a visual report in Portuguese.',
      es: 'La radiografía de tu sitio web en menos de un minuto: análisis de rendimiento, SEO y accesibilidad con nota de 0 a 100 e informe visual en portugués.',
    },
    href: 'https://farol-5vre.vercel.app/',
    live: 'https://farol-5vre.vercel.app/',
    repo: 'https://github.com/gabrielvalenco/farol',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Upstash'],
    image: '/farol.webp',
  },
  {
    title: 'Golfo OEG',
    desc: {
      pt: 'Plataforma institucional e hub digital para o Grupo Golfo OEG, com foco em comunicação corporativa e presença online.',
      en: 'Institutional platform and digital hub for Grupo Golfo OEG, focused on corporate communication and online presence.',
      es: 'Plataforma institucional y hub digital para el Grupo Golfo OEG, con foco en comunicación corporativa y presencia online.',
    },
    href: 'https://www.golfo-oeg.com/',
    live: 'https://www.golfo-oeg.com/',
    tags: ['React', 'Shadcn', 'PostgreSQL'],
    image: '/golfo.webp',
  },
  {
    title: 'Pecuária pelo Clima',
    desc: {
      pt: 'Site de prévia e divulgação do projeto Pecuária pelo Clima, conectando conteúdo e engajamento do setor agropecuário.',
      en: 'Preview and outreach website for the Pecuária pelo Clima project, connecting content and engagement in the agricultural sector.',
      es: 'Sitio de adelanto y divulgación del proyecto Pecuária pelo Clima, conectando contenido y participación del sector agropecuario.',
    },
    href: 'https://preview.pecuariapeloclima.org/',
    live: 'https://preview.pecuariapeloclima.org/',
    tags: ['PHP', 'CSS', 'JavaScript'],
    image: '/pecuaria.webp',
  },
  {
    title: 'Rose Valenço',
    desc: {
      pt: 'Website pessoal e profissional com design moderno, foco em presença digital e conversão.',
      en: 'Personal and professional website with a modern design, focused on digital presence and conversion.',
      es: 'Sitio web personal y profesional con diseño moderno, foco en presencia digital y conversión.',
    },
    href: 'https://rosevalenco.com.br/',
    live: 'https://rosevalenco.com.br/',
    tags: ['React', 'Shadcn', 'Vercel', 'PostgreSQL'],
    image: '/rose.webp',
  },
  {
    title: 'Dinâmico e Top',
    desc: {
      pt: 'Landing page institucional para colégio com 30 anos de tradição e foco em tecnologia.',
      en: 'Institutional landing page for a school with 30 years of tradition and a focus on technology.',
      es: 'Landing page institucional para un colegio con 30 años de tradición y foco en tecnología.',
    },
    href: 'https://www.dinamicoetop.com.br/',
    live: 'https://www.dinamicoetop.com.br/',
    tags: ['Landing page', 'Educação'],
  },
  {
    title: 'Terras de Santa Bárbara',
    desc: {
      pt: 'Landing page imobiliária para loteamento de alto padrão em Buritama (SP).',
      en: 'Real estate landing page for a high-end residential development in Buritama (SP).',
      es: 'Landing page inmobiliaria para un loteo residencial de alto nivel en Buritama (SP).',
    },
    href: 'https://terrassantabarbara.com/',
    live: 'https://terrassantabarbara.com/',
    tags: ['Landing page', 'Imobiliário'],
    image: '/terras.webp',
  },
  {
    title: 'Módulo One',
    desc: {
      pt: 'Landing page para construtora modular com foco em sistemas painelizados e vida leve.',
      en: 'Landing page for a modular construction company focused on panelized systems and light living.',
      es: 'Landing page para una constructora modular con foco en sistemas panelizados y vida ligera.',
    },
    href: 'https://www.moduloone.com.br/',
    live: 'https://www.moduloone.com.br/',
    tags: ['Landing page', 'SaaS', 'Admin panel'],
    image: '/modulo.webp',
  },
  {
    title: 'EnfantIA',
    desc: {
      pt: 'Plataforma educacional com experiências interativas e conteúdo dinâmico. Projeto encerrado, fora do ar.',
      en: 'Educational platform with interactive experiences and dynamic content. Discontinued project, offline.',
      es: 'Plataforma educativa con experiencias interactivas y contenido dinámico. Proyecto finalizado, fuera de línea.',
    },
    href: '#',
    tags: ['Web', 'UI/UX', 'Educação'],
  },
]

const FEATURED = new Set([
  'Estante',
  'Farol',
  'Golfo OEG',
])

export const featuredProjects = projects.filter(p => FEATURED.has(p.title))
export const otherProjects    = projects.filter(p => !FEATURED.has(p.title))
export const moreProjects     = projects.filter(p => !FEATURED.has(p.title))
