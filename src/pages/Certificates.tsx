import Section from '@/components/Section'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CheckCircle2, Award } from 'lucide-react'

interface Certificate {
  title: string
  description: string
  topics: string[]
  image?: string
}

const certificates: Certificate[] = [
  {
    title: "Banco de Dados SQL do Zero ao Avançado + Projetos Reais",
    description: "Curso completo focado em SQL, desde consultas básicas até modelagem complexa e relatórios.",
    topics: [
      "Consultas em banco de dados com SQL",
      "Criação e interação com bancos de dados",
      "Consultas complexas em várias tabelas (Joins, Subqueries)",
      "Modelagem de dados do mundo real e geração de relatórios"
    ]
  },
  {
    title: "Node.js do Zero a Maestria com diversos Projetos",
    description: "Formação abrangente no ecossistema Node.js, cobrindo backend, APIs e bancos de dados.",
    topics: [
      "Express, Handlebars (template engine)",
      "MongoDB (NoSQL) e Mongoose (ODM)",
      "MySQL (SQL) e Sequelize (ORM)",
      "APIs RESTful e Padrão MVC",
      "Fundamentos do Node.js e Core Modules",
      "NPM e criação de aplicações sem frameworks"
    ]
  },
  {
    title: "Aprenda Golang do Zero! Desenvolva uma APLICAÇÃO COMPLETA!",
    description: "Desenvolvimento de aplicações robustas e escaláveis com Go, incluindo uma rede social completa.",
    topics: [
      "Desenvolvimento de rede social (Front-end e Back-end com Go)",
      "Concorrência (Goroutines, Channels)",
      "Aplicações de linha de comando (CLI)",
      "APIs robustas e escaláveis com boas práticas",
      "Fundamentos aprofundados da linguagem Go"
    ]
  },
  {
    title: "Java COMPLETO Programação Orientada a Objetos + Projetos",
    description: "Curso exaustivo de Java e POO, cobrindo desde a sintaxe básica até frameworks de mercado.",
    topics: [
      "Lógica de programação e Sintaxe Java",
      "POO: Classes, Herança, Polimorfismo, Interfaces",
      "Estruturas de dados (Collections), Generics, Stream API",
      "Tratamento de exceções e Manipulação de arquivos",
      "JDBC, JPA / Hibernate, Spring Data JPA/MongoDB",
      "Spring Boot e JavaFX"
    ]
  }
]

export default function Certificates() {
  return (
    <div className="pt-20 min-h-screen">
      <Section id="certificates">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Meus Certificados</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Minha jornada de aprendizado e especialização técnica.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {certificates.map((cert, index) => (
            <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  {/* Placeholder for future image or certificate link */}
                  {/* <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4" /></Button> */}
                </div>
                <CardTitle className="mt-4 text-xl leading-tight">{cert.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {cert.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wider">O que aprendi:</h4>
                  <ul className="space-y-2">
                    {cert.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
