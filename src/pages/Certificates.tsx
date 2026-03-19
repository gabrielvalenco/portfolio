import Section from '@/components/Section'
import { CheckCircle2, Award, GraduationCap } from 'lucide-react'

interface Certificate {
  title: string
  description: string
  topics: string[]
}

const certificates: Certificate[] = [
  {
    title: 'Banco de Dados SQL do Zero ao Avançado + Projetos Reais',
    description:
      'Curso completo focado em SQL, desde consultas básicas até modelagem complexa e relatórios.',
    topics: [
      'Consultas em banco de dados com SQL',
      'Criação e interação com bancos de dados',
      'Consultas complexas em várias tabelas (Joins, Subqueries)',
      'Modelagem de dados do mundo real e geração de relatórios',
    ],
  },
  {
    title: 'Node.js do Zero a Maestria com diversos Projetos',
    description:
      'Formação abrangente no ecossistema Node.js, cobrindo backend, APIs e bancos de dados.',
    topics: [
      'Express, Handlebars (template engine)',
      'MongoDB (NoSQL) e Mongoose (ODM)',
      'MySQL (SQL) e Sequelize (ORM)',
      'APIs RESTful e Padrão MVC',
      'Fundamentos do Node.js e Core Modules',
      'NPM e criação de aplicações sem frameworks',
    ],
  },
  {
    title: 'Aprenda Golang do Zero! Desenvolva uma APLICAÇÃO COMPLETA!',
    description:
      'Desenvolvimento de aplicações robustas e escaláveis com Go, incluindo uma rede social completa.',
    topics: [
      'Desenvolvimento de rede social (Front-end e Back-end com Go)',
      'Concorrência (Goroutines, Channels)',
      'Aplicações de linha de comando (CLI)',
      'APIs robustas e escaláveis com boas práticas',
      'Fundamentos aprofundados da linguagem Go',
    ],
  },
  {
    title: 'Java COMPLETO Programação Orientada a Objetos + Projetos',
    description:
      'Curso exaustivo de Java e POO, cobrindo desde a sintaxe básica até frameworks de mercado.',
    topics: [
      'Lógica de programação e Sintaxe Java',
      'POO: Classes, Herança, Polimorfismo, Interfaces',
      'Estruturas de dados (Collections), Generics, Stream API',
      'Tratamento de exceções e Manipulação de arquivos',
      'JDBC, JPA / Hibernate, Spring Data JPA/MongoDB',
      'Spring Boot e JavaFX',
    ],
  },
]

const gradients = [
  'from-blue-600/30 to-cyan-500/20',
  'from-emerald-600/30 to-teal-500/20',
  'from-sky-600/30 to-blue-500/20',
  'from-amber-500/30 to-orange-400/20',
]

export default function Certificates() {
  return (
    <div className="pt-20 min-h-screen">
      <Section id="certificates">
        {/* Header */}
        <div className="mb-12 text-center relative">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.15), transparent 60%)',
            }}
          />
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary mb-4">
            <GraduationCap className="h-3.5 w-3.5" />
            Aprendizado contínuo
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Certificados
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Cursos e especializações que moldaram minha base técnica.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.2)]"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${gradients[i % gradients.length]}`} />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{cert.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                </div>

                <div className="mt-5 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Conteúdo aprendido
                  </p>
                  <ul className="space-y-2">
                    {cert.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
