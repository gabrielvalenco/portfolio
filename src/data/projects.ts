export type Project = {
  title: string
  desc:  string
  href:  string
  live?: string
  repo?: string
  image?: string
  tags?: string[]
}

export const projects: Project[] = [
  {
    title: 'Golfo OEG',
    desc: 'Plataforma institucional e hub digital para o Grupo Golfo OEG, com foco em comunicação corporativa e presença online.',
    href: 'https://www.golfo-oeg.com/',
    live: 'https://www.golfo-oeg.com/',
    tags: ['Web', 'Institucional'],
  },
  {
    title: 'Pecuária pelo Clima',
    desc: 'Site de prévia e divulgação do projeto Pecuária pelo Clima, conectando conteúdo e engajamento do setor agropecuário.',
    href: 'https://preview.pecuariapeloclima.org/',
    live: 'https://preview.pecuariapeloclima.org/',
    tags: ['Landing page', 'Web'],
  },
  {
    title: 'Rose Valenço',
    desc: 'Website pessoal e profissional com design moderno, foco em presença digital e conversão.',
    href: 'https://rosevalenco.com.br/',
    live: 'https://rosevalenco.com.br/',
    tags: ['Website', 'Web'],
  },
  {
    title: 'Dinâmico e Top',
    desc: 'Landing page institucional para colégio com 30 anos de tradição e foco em tecnologia.',
    href: 'https://www.dinamicoetop.com.br/',
    live: 'https://www.dinamicoetop.com.br/',
    tags: ['Landing page', 'Educação'],
  },
  {
    title: 'Terras de Santa Bárbara',
    desc: 'Landing page imobiliária para loteamento de alto padrão em Buritama (SP).',
    href: 'https://terrassantabarbara.com/',
    live: 'https://terrassantabarbara.com/',
    tags: ['Landing page', 'Imobiliário'],
  },
  {
    title: 'Módulo One',
    desc: 'Landing page para construtora modular com foco em sistemas painelizados e vida leve.',
    href: 'https://www.moduloone.com.br/',
    live: 'https://www.moduloone.com.br/',
    tags: ['Landing page', 'SaaS', 'Admin panel'],
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
