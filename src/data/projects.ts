export type Project = {
  title: string
  desc:  string
  href:  string
  live?: string
  repo?: string
  tags?: string[]
  image?: string
}

export const projects: Project[] = [
  {
    title: 'Golfo OEG',
    desc: 'Plataforma institucional e hub digital para o Grupo Golfo OEG, com foco em comunicação corporativa e presença online.',
    href: 'https://www.golfo-oeg.com/',
    live: 'https://www.golfo-oeg.com/',
    tags: ['Web', 'Institucional'],
    image: 'https://placehold.co/1200x700/0a0a0a/9eff00?text=Golfo+OEG',
  },
  {
    title: 'Pecuária pelo Clima',
    desc: 'Site de prévia e divulgação do projeto Pecuária pelo Clima, conectando conteúdo e engajamento do setor agropecuário.',
    href: 'https://preview.pecuariapeloclima.org/',
    live: 'https://preview.pecuariapeloclima.org/',
    tags: ['Landing page', 'Web'],
    image: 'https://placehold.co/1200x700/0a0a0a/9eff00?text=Pecuaria+pelo+Clima',
  },
  {
    title: 'Rose Valenço',
    desc: 'Website pessoal e profissional com design moderno, foco em presença digital e conversão.',
    href: 'https://rosevalenco.com.br/',
    live: 'https://rosevalenco.com.br/',
    tags: ['Website', 'Web'],
    image: 'https://placehold.co/1200x700/0a0a0a/9eff00?text=Rose+Valenco',
  },
  {
    title: 'Dinâmico e Top',
    desc: 'Landing page institucional para colégio com 30 anos de tradição e foco em tecnologia.',
    href: 'https://www.dinamicoetop.com.br/',
    live: 'https://www.dinamicoetop.com.br/',
    tags: ['Landing page', 'Educação'],
    image: 'https://placehold.co/1200x700/0a0a0a/9eff00?text=Dinamico+e+Top',
  },
  {
    title: 'Terras de Santa Bárbara',
    desc: 'Landing page imobiliária para loteamento de alto padrão em Buritama (SP).',
    href: 'https://terrassantabarbara.com/',
    live: 'https://terrassantabarbara.com/',
    tags: ['Landing page', 'Imobiliário'],
    image: 'https://placehold.co/1200x700/0a0a0a/9eff00?text=Terras+de+Santa+Barbara',
  },
  {
    title: 'Módulo One',
    desc: 'Landing page para construtora modular com foco em sistemas painelizados e vida leve.',
    href: 'https://www.moduloone.com.br/',
    live: 'https://www.moduloone.com.br/',
    tags: ['Landing page', 'SaaS', 'Admin panel'],
    image: 'https://placehold.co/1200x700/0a0a0a/9eff00?text=Modulo+One',
  },
]

const FEATURED = new Set([
  'Golfo OEG',
  'Pecuária pelo Clima',
  'Rose Valenço',
])

export const featuredProjects = projects.filter(p => FEATURED.has(p.title))
export const otherProjects    = projects.filter(p => !FEATURED.has(p.title))
export const moreProjects     = projects.slice(3, 6)
