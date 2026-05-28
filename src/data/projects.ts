export type Project = {
  title: string
  desc:  string
  href:  string
  live?: string
  repo?: string
  tags?: string[]
}

export const projects: Project[] = [
  {
    title: 'EnfantIA',
    desc: 'Plataforma educacional com experiências interativas, conteúdo dinâmico e design pensado para engajamento infantil.',
    href: 'https://enfantia.com.br/',
    live: 'https://enfantia.com.br/',
    tags: ['Web', 'UI/UX', 'React'],
  },
  {
    title: 'Audio Downloader & Transcriber',
    desc: 'Baixe áudio com yt-dlp + FFmpeg e transcreva via IA (CLI + Web).',
    href: 'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
    repo: 'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI',
    tags: ['Python', 'FFmpeg', 'yt-dlp', 'Web UI'],
  },
  {
    title: 'WebhookControl',
    desc: 'Entrega resiliente de webhooks com retries exponenciais, logs e Horizon.',
    href: 'https://github.com/gabrielvalenco/WebhookControl-Resilient-Webhook-Delivery-Platform',
    repo: 'https://github.com/gabrielvalenco/WebhookControl-Resilient-Webhook-Delivery-Platform',
    tags: ['Laravel', 'Redis', 'Horizon'],
  },
  {
    title: 'Intelligent Inventory',
    desc: 'Gestão de estoque com IA integrada a n8n e rotinas de automação.',
    href: 'https://github.com/gabrielvalenco/Intelligent-Inventory-Management-System-with-AI-Integration',
    repo: 'https://github.com/gabrielvalenco/Intelligent-Inventory-Management-System-with-AI-Integration',
    tags: ['n8n', 'Automação', 'IA'],
  },
  {
    title: 'Módulo One',
    desc: 'Landing page para construtora modular com foco em sistemas painelizados e vida leve.',
    href: 'https://moduloone.com.br/',
    live: 'https://moduloone.com.br/',
    tags: ['Landing page', 'SaaS', 'Admin panel'],
  },
  {
    title: 'Rose Valenço',
    desc: 'Website pessoal e profissional com design moderno, foco em presença digital e conversão.',
    href: 'https://rosevalenco.com.br/',
    live: 'https://rosevalenco.com.br/',
    tags: ['Landing page', 'Web'],
  },
  {
    title: 'Terras de Santa Bárbara',
    desc: 'Landing page imobiliária para loteamento de alto padrão em Buritama (SP).',
    href: 'https://terrassantabarbara.com/',
    live: 'https://terrassantabarbara.com/',
    tags: ['Landing page', 'Imobiliário'],
  },
  {
    title: 'Colégio Dinâmico',
    desc: 'Landing page institucional para colégio com 30 anos de tradição e foco em tecnologia.',
    href: 'https://www.dinamicoetop.com.br/',
    live: 'https://www.dinamicoetop.com.br/',
    tags: ['Landing page', 'Educação'],
  },
  {
    title: 'UI Experiments',
    desc: 'Interações, micro animações e protótipos em React com GSAP.',
    href: '#',
    tags: ['React', 'GSAP'],
  },
  {
    title: 'Data Tools',
    desc: 'Pipelines e ETL para processamento e análise de dados.',
    href: '#',
    tags: ['Python', 'ETL'],
  },
]

const FEATURED = new Set([
  'EnfantIA',
  'WebhookControl',
  'Audio Downloader & Transcriber',
])

export const featuredProjects = projects.filter(p => FEATURED.has(p.title))
export const otherProjects    = projects.filter(p => !FEATURED.has(p.title))
