export type Course = {
  title: string
  provider: 'Udemy' | 'Rocketseat'
  /** Mes de conclusao (AAAA-MM), quando ha certificado. */
  date?: string
  hours?: number
  /** PDF em public/certificados. */
  certificate?: string
}

// Todos concluidos. Python, Auditor SGI e SAP Debug ainda nao tem PDF de certificado na pasta.
export const courses: Course[] = [
  { title: 'SAP ABAP - Aprenda partindo do zero 2026', provider: 'Udemy', date: '2026-11', hours: 30.5, certificate: '/certificados/sap-abap.pdf' },
  { title: 'SAP ABAP OO - Orientação a Objetos', provider: 'Udemy', date: '2026-11', hours: 8, certificate: '/certificados/sap-abap-oo.pdf' },
  { title: 'Carreira IA: do zero ao primeiro agente automático com n8n', provider: 'Rocketseat', date: '2026-01', hours: 5, certificate: '/certificados/carreira-ia.pdf' },
  { title: 'Banco de Dados SQL do Zero ao Avançado + Projetos Reais', provider: 'Udemy', date: '2025-12', hours: 8, certificate: '/certificados/sql.pdf' },
  { title: 'Aprenda Golang do Zero! Desenvolva uma APLICAÇÃO COMPLETA!', provider: 'Udemy', date: '2025-12', hours: 27, certificate: '/certificados/golang.pdf' },
  { title: 'Node.js do Zero a Maestria com diversos Projetos', provider: 'Udemy', date: '2025-12', hours: 38, certificate: '/certificados/nodejs.pdf' },
  { title: 'Java COMPLETO Programação Orientada a Objetos + Projetos', provider: 'Udemy', date: '2025-12', hours: 54, certificate: '/certificados/java.pdf' },
  { title: 'NLW Pocket | Iniciantes - Fullstack', provider: 'Rocketseat', date: '2025-10', hours: 5, certificate: '/certificados/nlw-pocket.pdf' },
  { title: 'NLW Agents - Avançado', provider: 'Rocketseat', date: '2025-07', hours: 5, certificate: '/certificados/nlw-agents.pdf' },
  { title: 'Curso de Python 3 do básico ao avançado - com projetos reais', provider: 'Udemy' },
  { title: 'Auditor Interno do SGI (ISO 9001 + ISO 14001 + ISO 45001)', provider: 'Udemy' },
  { title: 'SAP Debug - Aprenda partindo do zero 2026', provider: 'Udemy' },
]
