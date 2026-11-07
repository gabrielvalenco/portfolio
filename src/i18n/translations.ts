export type Lang = 'pt' | 'en' | 'es'

// Trechos entre ** viram destaque (ver Rich.tsx).
const pt = {
  meta: {
    title: 'Gabriel Valenço | Full Stack Developer',
    description:
      'Gabriel Valenço, Full Stack Developer. Construo aplicações web, mobile e com IA para pequenos negócios e clientes remotos.',
  },

  common: {
    skip: 'Ir para conteúdo',
    back: 'Voltar',
    current: 'atual',
    visitSite: 'Ver site',
    code: 'Código',
    viewGithub: 'Ver no GitHub',
    langLabel: 'Idioma',
    tags: {} as Record<string, string>,
  },

  nav: {
    projects: 'Projetos',
    about: 'Sobre',
    experience: 'Experiência',
    courses: 'Cursos',
    contact: 'Contato',
    resume: 'Currículo',
    main: 'Navegação principal',
    theme: 'Alternar tema claro/escuro',
  },

  hero: {
    role: 'Full Stack Developer',
    lead: 'Construo',
    words: ['aplicações web', 'apps mobile', 'soluções com IA', 'SaaS'],
    tail: 'para pequenos negócios e clientes remotos.',
    available: 'Disponível para novos projetos',
    ctaProjects: 'Ver projetos',
    ctaContact: 'Entrar em contato',
  },

  tech: {
    title: 'Stack',
    subtitle: 'Ferramentas que uso no dia a dia, do banco de dados à interface.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      data: 'Dados',
      infra: 'Infra',
    } as Record<string, string>,
  },

  home: {
    projectsTitle: 'Projetos selecionados',
    projectsSubtitle: 'Alguns dos produtos que construí, do SaaS ao site institucional.',
    allProjects: 'Ver todos os projetos',
    aboutTitle: 'Sobre',
    p1: 'Sou desenvolvedor full-stack e cuido de todo o ciclo do produto, do banco de dados à interface. Trabalho com SaaS, automações e integrações, sempre buscando soluções simples de manter.',
    p2: 'Hoje sou desenvolvedor pleno na **OneMoving**, onde respondo pelo sistema e pelos aplicativos da plataforma. Também aceito projetos freelancer selecionados.',
    learnMore: 'Saiba mais sobre mim',
    experienceTitle: 'Experiência',
    allExperience: 'Ver trajetória completa',
  },

  courses: {
    title: 'Cursos',
    subtitle: 'Formações e cursos concluídos, com certificado quando disponível.',
    done: 'Concluído',
    certificate: 'Ver certificado',
    more: 'Ver detalhes dos cursos',
  },

  contact: {
    title: 'Contato',
    heading: 'Vamos trabalhar juntos?',
    text: 'Estou disponível para projetos freelancer de SaaS, automações, integrações e desenvolvimento full-stack. Me escreva e eu respondo em breve.',
    email: 'Email',
  },

  footer: {
    rights: 'Todos os direitos reservados.',
    top: 'Voltar ao topo',
  },

  about: {
    title: 'Sobre mim',
    subtitle: 'Quem eu sou, o que entrego e como cheguei até aqui.',
    introTitle: 'Apresentação',
    intro1:
      'Me chamo **Gabriel Valenço**, sou desenvolvedor full-stack focado em criar produtos digitais que entregam valor real, não só telas bonitas.',
    intro2:
      'Meu trabalho passa por SaaS, automações, landing pages de alto desempenho e ferramentas internas. Gosto de problemas onde front-end e back-end conversam: painéis, integrações e pipelines de dados.',
    pathTitle: 'Trajetória',
    path1:
      'Comecei a programar por curiosidade, querendo entender como as coisas funcionavam por dentro. Antes do desenvolvimento, passei por **tráfego pago**, onde aprendi a medir tudo. Esse hábito virou o filtro que uso para escrever software hoje: se não dá para observar, não dá para melhorar.',
    path2:
      'Migrei para desenvolvimento full-stack em equipes pequenas, onde pude tocar do banco de dados ao deploy. Hoje atuo como desenvolvedor pleno na **OneMoving**, responsável pelo desenvolvimento do sistema e dos aplicativos ligados à plataforma.',
    focusTitle: 'Áreas de foco',
    focus: [
      { tag: 'SaaS', desc: 'Produtos web completos: autenticação, pagamentos, painéis e área administrativa.' },
      { tag: 'Automação', desc: 'Fluxos automatizados, integrações entre sistemas e otimização de processos repetitivos.' },
      { tag: 'Front-end', desc: 'Interfaces modernas em React e Vue, com animações sob medida e foco em usabilidade.' },
      { tag: 'Back-end', desc: 'APIs escaláveis em Laravel e Node, com banco de dados e cache para alta performance.' },
    ],
    thinkTitle: 'Como penso',
    principles: [
      'Entregar valor em iterações curtas, não ferramentas em iterações longas.',
      'Código que se lê em voz alta, clareza acima de esperteza.',
      'Medir antes de otimizar; respeitar limites da máquina e do humano.',
      'Design e experiência do usuário são problemas de engenharia, não decoração.',
    ],
    quickTitle: 'Resumo rápido',
    facts: [
      { k: 'Localização', v: 'Brasil (trabalho remoto)' },
      { k: 'Formação', v: 'Tecnologia e Desenvolvimento de Sistemas · Unisalesiano, 2021–2025' },
      { k: 'Idiomas', v: 'Português · Inglês avançado' },
      { k: 'Disponível', v: 'Freelancer / contrato' },
      { k: 'Hobbies', v: 'Leitura · escrita · cinema · academia' },
    ],
    nowTitle: 'No momento',
    now1: 'Desenvolvendo do sistema e dos aplicativos na OneMoving e aceitando freelas selecionados em SaaS e automações.',
    now2: 'Estudando arquitetura de sistemas distribuídos e métricas de experiência do usuário.',
    ctaJourney: 'Minha trajetória',
    ctaContact: 'Fale comigo',
  },

  experience: {
    title: 'Trajetória',
    subtitle: 'As experiências profissionais que me trouxeram até aqui.',
    // Mesma ordem de `roles` em pages/Experience.tsx.
    roles: [
      {
        role: 'Desenvolvedor Pleno',
        period: '2026 - atual',
        bullets: [
          'Responsável pelo desenvolvimento do sistema principal da empresa, desde a arquitetura até as entregas em produção.',
          'Desenvolvimento de aplicativos integrados ao sistema, conectando operações, clientes e parceiros em uma mesma plataforma.',
          'Responsabilidade técnica pela evolução do produto, definição de padrões de código e integração de novas funcionalidades.',
        ],
      },
      {
        role: 'Full Stack Developer & Tech Lead',
        period: '2025 - 29/07/2026',
        bullets: [
          'Liderei o desenvolvimento técnico de produtos digitais para clientes de diferentes segmentos.',
          'Arquitetei soluções full-stack: front-end, API, banco de dados e automações, alinhadas aos objetivos de negócio.',
          'Estabeleci padrões de qualidade, revisão de código e processos de entrega contínua.',
          'Fiz mentoria técnica para devs juniores e atuei como ponte com as áreas de design e tráfego pago.',
        ],
      },
      {
        role: 'Full Stack Developer',
        period: '2023 - 2024',
        bullets: [
          'Desenvolvimento de sistemas internos e integrações entre plataformas do grupo.',
          'Manutenção e evolução de aplicações em produção, com foco em estabilidade e performance.',
          'Colaboração direta com áreas operacionais para entender requisitos e propor melhorias.',
        ],
      },
      {
        role: 'Tráfego Pago',
        period: '2024 - 2025',
        bullets: [
          'Planejamento e gestão de campanhas em Meta Ads e Google Ads para clientes B2C.',
          'Análise de funil, otimização de criativos e relatórios orientados a métricas-chave.',
          'A leitura crítica de dados desse período virou a base de como eu meço produto até hoje.',
        ],
      },
    ],
    educationTitle: 'Formação acadêmica',
    degree: 'Tecnologia e Desenvolvimento de Sistemas (TDS)',
    graduated: 'Formado',
    ctaAbout: 'Sobre mim',
  },

  certificates: {
    title: 'Certificados',
    subtitle: 'Cursos e especializações que moldaram minha base técnica.',
    learned: 'Conteúdo aprendido',
    // Mesma ordem de `certificates` em pages/Certificates.tsx.
    items: [
      {
        description: 'Curso completo focado em SQL, desde consultas básicas até modelagem complexa e relatórios.',
        topics: [
          'Consultas em banco de dados com SQL',
          'Criação e interação com bancos de dados',
          'Consultas complexas em várias tabelas (Joins, Subqueries)',
          'Modelagem de dados do mundo real e geração de relatórios',
        ],
      },
      {
        description: 'Formação abrangente no ecossistema Node.js, cobrindo backend, APIs e bancos de dados.',
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
        description: 'Desenvolvimento de aplicações robustas e escaláveis com Go, incluindo uma rede social completa.',
        topics: [
          'Desenvolvimento de rede social (Front-end e Back-end com Go)',
          'Concorrência (Goroutines, Channels)',
          'Aplicações de linha de comando (CLI)',
          'APIs robustas e escaláveis com boas práticas',
          'Fundamentos aprofundados da linguagem Go',
        ],
      },
      {
        description: 'Curso exaustivo de Java e POO, cobrindo desde a sintaxe básica até frameworks de mercado.',
        topics: [
          'Lógica de programação e Sintaxe Java',
          'POO: Classes, Herança, Polimorfismo, Interfaces',
          'Estruturas de dados (Collections), Generics, Stream API',
          'Tratamento de exceções e Manipulação de arquivos',
          'JDBC, JPA / Hibernate, Spring Data JPA/MongoDB',
          'Spring Boot e JavaFX',
        ],
      },
      {
        description: 'Formação para auditar Sistemas de Gestão Integrados com base nas normas ISO 9001, 14001 e 45001.',
        topics: [
          'Qualidade (ISO 9001), Meio Ambiente (ISO 14001) e Saúde e Segurança (ISO 45001)',
          'Princípios e planejamento de auditorias internas',
          'Execução de auditorias e relato de não conformidades',
        ],
      },
      {
        description: 'Curso de depuração (debug) em SAP, partindo do zero até a análise de programas ABAP.',
        topics: [
          'Fundamentos do debugger do SAP',
          'Breakpoints e análise do fluxo de execução',
          'Inspeção de variáveis e tabelas internas',
        ],
      },
      {
        description: 'Curso de ABAP com Orientação a Objetos, aplicando POO no ecossistema SAP.',
        topics: [
          'Classes, objetos e métodos em ABAP',
          'Herança, polimorfismo e interfaces',
          'Boas práticas de ABAP orientado a objetos',
        ],
      },
      {
        description: 'Curso de ABAP partindo do zero, a linguagem de programação do SAP.',
        topics: [
          'Fundamentos da linguagem ABAP',
          'Tipos de dados, estruturas e tabelas internas',
          'Acesso ao banco de dados e relatórios',
        ],
      },
    ],
  },

  projectsPage: {
    title: 'Projetos',
    subtitle: (n: number) => `Todos os ${n} projetos que já construí, em destaque e arquivo.`,
    featured: 'Em destaque',
    others: 'Outros projetos',
  },

  moreProjects: {
    title: 'Mais projetos',
    subtitle: 'Outros projetos desenvolvidos com foco em landing pages, presença digital e conversão.',
    backHome: 'Voltar para o início',
  },
}

export type Dict = typeof pt

const en: Dict = {
  meta: {
    title: 'Gabriel Valenço | Full Stack Developer',
    description:
      'Gabriel Valenço, Full Stack Developer. I build web, mobile and AI-powered applications for small businesses and remote clients.',
  },

  common: {
    skip: 'Skip to content',
    back: 'Back',
    current: 'current',
    visitSite: 'Visit site',
    code: 'Code',
    viewGithub: 'View on GitHub',
    langLabel: 'Language',
    tags: { 'Educação': 'Education', 'Imobiliário': 'Real estate' },
  },

  nav: {
    projects: 'Projects',
    about: 'About',
    experience: 'Experience',
    courses: 'Courses',
    contact: 'Contact',
    resume: 'Resume',
    main: 'Main navigation',
    theme: 'Toggle light/dark theme',
  },

  hero: {
    role: 'Full Stack Developer',
    lead: 'I build',
    words: ['web apps', 'mobile apps', 'AI solutions', 'SaaS'],
    tail: 'for small businesses and remote clients.',
    available: 'Available for new projects',
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
  },

  tech: {
    title: 'Stack',
    subtitle: 'Tools I use every day, from the database to the interface.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      data: 'Data',
      infra: 'Infra',
    },
  },

  home: {
    projectsTitle: 'Selected projects',
    projectsSubtitle: "A few products I've built, from SaaS to institutional websites.",
    allProjects: 'View all projects',
    aboutTitle: 'About',
    p1: "I'm a full-stack developer and I take care of the whole product cycle, from the database to the interface. I work on SaaS, automation and integrations, always aiming for solutions that are easy to maintain.",
    p2: "I'm currently a mid-level developer at **OneMoving**, where I'm responsible for the system and the apps on the platform. I also take on selected freelance projects.",
    learnMore: 'More about me',
    experienceTitle: 'Experience',
    allExperience: 'See full journey',
  },

  courses: {
    title: 'Courses',
    subtitle: 'Completed courses and training, with the certificate when available.',
    done: 'Completed',
    certificate: 'View certificate',
    more: 'See course details',
  },

  contact: {
    title: 'Contact',
    heading: "Let's work together?",
    text: "I'm available for freelance projects in SaaS, automation, integrations and full-stack development. Send me a message and I'll get back to you soon.",
    email: 'Email',
  },

  footer: {
    rights: 'All rights reserved.',
    top: 'Back to top',
  },

  about: {
    title: 'About me',
    subtitle: 'Who I am, what I deliver and how I got here.',
    introTitle: 'Introduction',
    intro1:
      "I'm **Gabriel Valenço**, a full-stack developer focused on building digital products that deliver real value, not just good-looking screens.",
    intro2:
      'My work covers SaaS, automation, high-performance landing pages and internal tools. I like problems where front-end and back-end meet: dashboards, integrations and data pipelines.',
    pathTitle: 'Journey',
    path1:
      'I started programming out of curiosity, wanting to understand how things worked on the inside. Before development, I worked in **paid traffic**, where I learned to measure everything. That habit became the filter I use to write software today: if you can\'t observe it, you can\'t improve it.',
    path2:
      'I moved into full-stack development in small teams, where I got to touch everything from the database to deployment. Today I work as a mid-level developer at **OneMoving**, responsible for developing the system and the apps tied to the platform.',
    focusTitle: 'Focus areas',
    focus: [
      { tag: 'SaaS', desc: 'Complete web products: authentication, payments, dashboards and admin area.' },
      { tag: 'Automation', desc: 'Automated flows, integrations between systems and optimization of repetitive processes.' },
      { tag: 'Front-end', desc: 'Modern interfaces in React and Vue, with custom animations and a focus on usability.' },
      { tag: 'Back-end', desc: 'Scalable APIs in Laravel and Node, with database and cache for high performance.' },
    ],
    thinkTitle: 'How I think',
    principles: [
      'Deliver value in short iterations, not tools in long ones.',
      'Code that reads aloud: clarity over cleverness.',
      'Measure before optimizing; respect the limits of the machine and the human.',
      'Design and user experience are engineering problems, not decoration.',
    ],
    quickTitle: 'Quick summary',
    facts: [
      { k: 'Location', v: 'Brazil (remote work)' },
      { k: 'Education', v: 'Systems Development Technology (TDS) · Unisalesiano, 2021–2025' },
      { k: 'Languages', v: 'Portuguese · Advanced English' },
      { k: 'Available', v: 'Freelance / contract' },
      { k: 'Hobbies', v: 'Reading · writing · movies · gym' },
    ],
    nowTitle: 'Right now',
    now1: 'Developing the system and apps at OneMoving and taking on selected freelance work in SaaS and automation.',
    now2: 'Studying distributed systems architecture and user experience metrics.',
    ctaJourney: 'My journey',
    ctaContact: 'Get in touch',
  },

  experience: {
    title: 'Journey',
    subtitle: 'The professional experiences that brought me here.',
    roles: [
      {
        role: 'Mid-level Developer',
        period: '2026 - present',
        bullets: [
          "Responsible for developing the company's main system, from architecture to production releases.",
          'Development of apps integrated with the system, connecting operations, clients and partners on a single platform.',
          'Technical ownership of the product evolution, defining code standards and integrating new features.',
        ],
      },
      {
        role: 'Full Stack Developer & Tech Lead',
        period: '2025 - Jul 29, 2026',
        bullets: [
          'Led the technical development of digital products for clients across different industries.',
          'Architected full-stack solutions: front-end, API, database and automation, aligned with business goals.',
          'Set quality standards, code review and continuous delivery processes.',
          'Mentored junior devs and acted as a bridge with the design and paid traffic teams.',
        ],
      },
      {
        role: 'Full Stack Developer',
        period: '2023 - 2024',
        bullets: [
          "Built internal systems and integrations between the group's platforms.",
          'Maintained and evolved production applications, focused on stability and performance.',
          'Worked directly with operational teams to understand requirements and propose improvements.',
        ],
      },
      {
        role: 'Paid Traffic',
        period: '2024 - 2025',
        bullets: [
          'Planned and managed Meta Ads and Google Ads campaigns for B2C clients.',
          'Funnel analysis, creative optimization and reports driven by key metrics.',
          'The critical reading of data from this period became the basis of how I measure product to this day.',
        ],
      },
    ],
    educationTitle: 'Education',
    degree: 'Systems Development Technology (TDS)',
    graduated: 'Graduated',
    ctaAbout: 'About me',
  },

  certificates: {
    title: 'Certificates',
    subtitle: 'Courses and specializations that shaped my technical foundation.',
    learned: 'What I learned',
    items: [
      {
        description: 'Complete SQL-focused course, from basic queries to advanced modeling and reporting.',
        topics: [
          'Querying databases with SQL',
          'Creating and interacting with databases',
          'Complex multi-table queries (Joins, Subqueries)',
          'Real-world data modeling and report generation',
        ],
      },
      {
        description: 'Comprehensive training in the Node.js ecosystem, covering backend, APIs and databases.',
        topics: [
          'Express, Handlebars (template engine)',
          'MongoDB (NoSQL) and Mongoose (ODM)',
          'MySQL (SQL) and Sequelize (ORM)',
          'RESTful APIs and the MVC pattern',
          'Node.js fundamentals and Core Modules',
          'NPM and building applications without frameworks',
        ],
      },
      {
        description: 'Building robust, scalable applications with Go, including a complete social network.',
        topics: [
          'Social network development (Front-end and Back-end with Go)',
          'Concurrency (Goroutines, Channels)',
          'Command-line applications (CLI)',
          'Robust, scalable APIs with best practices',
          'In-depth Go language fundamentals',
        ],
      },
      {
        description: 'Exhaustive Java and OOP course, from basic syntax to market-standard frameworks.',
        topics: [
          'Programming logic and Java syntax',
          'OOP: Classes, Inheritance, Polymorphism, Interfaces',
          'Data structures (Collections), Generics, Stream API',
          'Exception handling and file manipulation',
          'JDBC, JPA / Hibernate, Spring Data JPA/MongoDB',
          'Spring Boot and JavaFX',
        ],
      },
      {
        description: 'Training to audit Integrated Management Systems based on ISO 9001, 14001 and 45001.',
        topics: [
          'Quality (ISO 9001), Environment (ISO 14001) and Health & Safety (ISO 45001)',
          'Internal audit principles and planning',
          'Conducting audits and reporting nonconformities',
        ],
      },
      {
        description: 'SAP debugging course, from zero to analyzing ABAP programs.',
        topics: [
          'SAP debugger fundamentals',
          'Breakpoints and execution flow analysis',
          'Inspecting variables and internal tables',
        ],
      },
      {
        description: 'Object-Oriented ABAP course, applying OOP within the SAP ecosystem.',
        topics: [
          'Classes, objects and methods in ABAP',
          'Inheritance, polymorphism and interfaces',
          'Object-oriented ABAP best practices',
        ],
      },
      {
        description: 'ABAP course starting from zero, the programming language of SAP.',
        topics: [
          'ABAP language fundamentals',
          'Data types, structures and internal tables',
          'Database access and reports',
        ],
      },
    ],
  },

  projectsPage: {
    title: 'Projects',
    subtitle: (n: number) => `All ${n} projects I've built, featured and archived.`,
    featured: 'Featured',
    others: 'Other projects',
  },

  moreProjects: {
    title: 'More projects',
    subtitle: "Other projects I've built, focused on landing pages, digital presence and conversion.",
    backHome: 'Back to home',
  },
}

const es: Dict = {
  meta: {
    title: 'Gabriel Valenço | Full Stack Developer',
    description:
      'Gabriel Valenço, Full Stack Developer. Construyo aplicaciones web, móviles y con IA para pequeños negocios y clientes remotos.',
  },

  common: {
    skip: 'Ir al contenido',
    back: 'Volver',
    current: 'actual',
    visitSite: 'Ver sitio',
    code: 'Código',
    viewGithub: 'Ver en GitHub',
    langLabel: 'Idioma',
    tags: { 'Educação': 'Educación', 'Imobiliário': 'Inmobiliario' },
  },

  nav: {
    projects: 'Proyectos',
    about: 'Sobre mí',
    experience: 'Experiencia',
    courses: 'Cursos',
    contact: 'Contacto',
    resume: 'Currículum',
    main: 'Navegación principal',
    theme: 'Cambiar tema claro/oscuro',
  },

  hero: {
    role: 'Full Stack Developer',
    lead: 'Construyo',
    words: ['aplicaciones web', 'apps móviles', 'soluciones con IA', 'SaaS'],
    tail: 'para pequeños negocios y clientes remotos.',
    available: 'Disponible para nuevos proyectos',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Contactar',
  },

  tech: {
    title: 'Stack',
    subtitle: 'Herramientas que uso a diario, de la base de datos a la interfaz.',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      data: 'Datos',
      infra: 'Infra',
    },
  },

  home: {
    projectsTitle: 'Proyectos seleccionados',
    projectsSubtitle: 'Algunos de los productos que construí, del SaaS al sitio institucional.',
    allProjects: 'Ver todos los proyectos',
    aboutTitle: 'Sobre mí',
    p1: 'Soy desarrollador full-stack y me ocupo de todo el ciclo del producto, de la base de datos a la interfaz. Trabajo con SaaS, automatizaciones e integraciones, siempre buscando soluciones fáciles de mantener.',
    p2: 'Hoy soy desarrollador de nivel intermedio en **OneMoving**, donde respondo por el sistema y por las aplicaciones de la plataforma. También acepto proyectos freelance seleccionados.',
    learnMore: 'Más sobre mí',
    experienceTitle: 'Experiencia',
    allExperience: 'Ver trayectoria completa',
  },

  courses: {
    title: 'Cursos',
    subtitle: 'Formaciones y cursos completados, con certificado cuando está disponible.',
    done: 'Completado',
    certificate: 'Ver certificado',
    more: 'Ver detalles de los cursos',
  },

  contact: {
    title: 'Contacto',
    heading: '¿Trabajamos juntos?',
    text: 'Estoy disponible para proyectos freelance de SaaS, automatizaciones, integraciones y desarrollo full-stack. Escríbeme y te respondo pronto.',
    email: 'Email',
  },

  footer: {
    rights: 'Todos los derechos reservados.',
    top: 'Volver arriba',
  },

  about: {
    title: 'Sobre mí',
    subtitle: 'Quién soy, qué entrego y cómo llegué hasta aquí.',
    introTitle: 'Presentación',
    intro1:
      'Me llamo **Gabriel Valenço**, soy desarrollador full-stack enfocado en crear productos digitales que aportan valor real, no solo pantallas bonitas.',
    intro2:
      'Mi trabajo abarca SaaS, automatizaciones, landing pages de alto rendimiento y herramientas internas. Me gustan los problemas donde el front-end y el back-end se encuentran: paneles, integraciones y pipelines de datos.',
    pathTitle: 'Trayectoria',
    path1:
      'Empecé a programar por curiosidad, queriendo entender cómo funcionaban las cosas por dentro. Antes del desarrollo trabajé en **tráfico pago**, donde aprendí a medirlo todo. Ese hábito se convirtió en el filtro con el que escribo software hoy: si no se puede observar, no se puede mejorar.',
    path2:
      'Pasé al desarrollo full-stack en equipos pequeños, donde pude tocar desde la base de datos hasta el despliegue. Hoy trabajo como desarrollador de nivel intermedio en **OneMoving**, responsable del desarrollo del sistema y de las aplicaciones de la plataforma.',
    focusTitle: 'Áreas de enfoque',
    focus: [
      { tag: 'SaaS', desc: 'Productos web completos: autenticación, pagos, paneles y área administrativa.' },
      { tag: 'Automatización', desc: 'Flujos automatizados, integraciones entre sistemas y optimización de procesos repetitivos.' },
      { tag: 'Front-end', desc: 'Interfaces modernas en React y Vue, con animaciones a medida y foco en la usabilidad.' },
      { tag: 'Back-end', desc: 'APIs escalables en Laravel y Node, con base de datos y caché para alto rendimiento.' },
    ],
    thinkTitle: 'Cómo pienso',
    principles: [
      'Entregar valor en iteraciones cortas, no herramientas en iteraciones largas.',
      'Código que se lee en voz alta: claridad por encima de ingenio.',
      'Medir antes de optimizar; respetar los límites de la máquina y del humano.',
      'El diseño y la experiencia de usuario son problemas de ingeniería, no decoración.',
    ],
    quickTitle: 'Resumen rápido',
    facts: [
      { k: 'Ubicación', v: 'Brasil (trabajo remoto)' },
      { k: 'Formación', v: 'Tecnología en Desarrollo de Sistemas (TDS) · Unisalesiano, 2021–2025' },
      { k: 'Idiomas', v: 'Portugués · Inglés avanzado' },
      { k: 'Disponible', v: 'Freelance / contrato' },
      { k: 'Hobbies', v: 'Lectura · escritura · cine · gimnasio' },
    ],
    nowTitle: 'Ahora',
    now1: 'Desarrollando el sistema y las apps en OneMoving y aceptando trabajos freelance selectos en SaaS y automatizaciones.',
    now2: 'Estudiando arquitectura de sistemas distribuidos y métricas de experiencia de usuario.',
    ctaJourney: 'Mi trayectoria',
    ctaContact: 'Contactar',
  },

  experience: {
    title: 'Trayectoria',
    subtitle: 'Las experiencias profesionales que me trajeron hasta aquí.',
    roles: [
      {
        role: 'Desarrollador de nivel intermedio',
        period: '2026 - actual',
        bullets: [
          'Responsable del desarrollo del sistema principal de la empresa, desde la arquitectura hasta las entregas en producción.',
          'Desarrollo de aplicaciones integradas al sistema, conectando operaciones, clientes y socios en una misma plataforma.',
          'Responsabilidad técnica en la evolución del producto, definición de estándares de código e integración de nuevas funcionalidades.',
        ],
      },
      {
        role: 'Full Stack Developer & Tech Lead',
        period: '2025 - 29/07/2026',
        bullets: [
          'Lideré el desarrollo técnico de productos digitales para clientes de distintos sectores.',
          'Diseñé soluciones full-stack: front-end, API, base de datos y automatizaciones, alineadas con los objetivos del negocio.',
          'Establecí estándares de calidad, revisión de código y procesos de entrega continua.',
          'Hice mentoría técnica a devs junior y actué como puente con las áreas de diseño y tráfico pago.',
        ],
      },
      {
        role: 'Full Stack Developer',
        period: '2023 - 2024',
        bullets: [
          'Desarrollo de sistemas internos e integraciones entre plataformas del grupo.',
          'Mantenimiento y evolución de aplicaciones en producción, con foco en estabilidad y rendimiento.',
          'Colaboración directa con áreas operativas para entender requisitos y proponer mejoras.',
        ],
      },
      {
        role: 'Tráfico pago',
        period: '2024 - 2025',
        bullets: [
          'Planificación y gestión de campañas en Meta Ads y Google Ads para clientes B2C.',
          'Análisis de embudo, optimización de creativos e informes orientados a métricas clave.',
          'La lectura crítica de datos de ese período se convirtió en la base de cómo mido producto hasta hoy.',
        ],
      },
    ],
    educationTitle: 'Formación académica',
    degree: 'Tecnología en Desarrollo de Sistemas (TDS)',
    graduated: 'Graduado',
    ctaAbout: 'Sobre mí',
  },

  certificates: {
    title: 'Certificados',
    subtitle: 'Cursos y especializaciones que moldearon mi base técnica.',
    learned: 'Contenido aprendido',
    items: [
      {
        description: 'Curso completo centrado en SQL, desde consultas básicas hasta modelado complejo e informes.',
        topics: [
          'Consultas a bases de datos con SQL',
          'Creación e interacción con bases de datos',
          'Consultas complejas en varias tablas (Joins, Subqueries)',
          'Modelado de datos del mundo real y generación de informes',
        ],
      },
      {
        description: 'Formación amplia en el ecosistema Node.js, cubriendo backend, APIs y bases de datos.',
        topics: [
          'Express, Handlebars (motor de plantillas)',
          'MongoDB (NoSQL) y Mongoose (ODM)',
          'MySQL (SQL) y Sequelize (ORM)',
          'APIs RESTful y patrón MVC',
          'Fundamentos de Node.js y Core Modules',
          'NPM y creación de aplicaciones sin frameworks',
        ],
      },
      {
        description: 'Desarrollo de aplicaciones robustas y escalables con Go, incluyendo una red social completa.',
        topics: [
          'Desarrollo de una red social (Front-end y Back-end con Go)',
          'Concurrencia (Goroutines, Channels)',
          'Aplicaciones de línea de comandos (CLI)',
          'APIs robustas y escalables con buenas prácticas',
          'Fundamentos avanzados del lenguaje Go',
        ],
      },
      {
        description: 'Curso exhaustivo de Java y POO, desde la sintaxis básica hasta frameworks del mercado.',
        topics: [
          'Lógica de programación y sintaxis de Java',
          'POO: Clases, Herencia, Polimorfismo, Interfaces',
          'Estructuras de datos (Collections), Generics, Stream API',
          'Manejo de excepciones y manipulación de archivos',
          'JDBC, JPA / Hibernate, Spring Data JPA/MongoDB',
          'Spring Boot y JavaFX',
        ],
      },
      {
        description: 'Formación para auditar Sistemas de Gestión Integrados basada en las normas ISO 9001, 14001 y 45001.',
        topics: [
          'Calidad (ISO 9001), Medio Ambiente (ISO 14001) y Salud y Seguridad (ISO 45001)',
          'Principios y planificación de auditorías internas',
          'Ejecución de auditorías y reporte de no conformidades',
        ],
      },
      {
        description: 'Curso de depuración (debug) en SAP, desde cero hasta el análisis de programas ABAP.',
        topics: [
          'Fundamentos del debugger de SAP',
          'Breakpoints y análisis del flujo de ejecución',
          'Inspección de variables y tablas internas',
        ],
      },
      {
        description: 'Curso de ABAP con Orientación a Objetos, aplicando POO en el ecosistema SAP.',
        topics: [
          'Clases, objetos y métodos en ABAP',
          'Herencia, polimorfismo e interfaces',
          'Buenas prácticas de ABAP orientado a objetos',
        ],
      },
      {
        description: 'Curso de ABAP desde cero, el lenguaje de programación de SAP.',
        topics: [
          'Fundamentos del lenguaje ABAP',
          'Tipos de datos, estructuras y tablas internas',
          'Acceso a la base de datos e informes',
        ],
      },
    ],
  },

  projectsPage: {
    title: 'Proyectos',
    subtitle: (n: number) => `Los ${n} proyectos que construí, destacados y archivo.`,
    featured: 'Destacados',
    others: 'Otros proyectos',
  },

  moreProjects: {
    title: 'Más proyectos',
    subtitle: 'Otros proyectos desarrollados con foco en landing pages, presencia digital y conversión.',
    backHome: 'Volver al inicio',
  },
}

export const translations: Record<Lang, Dict> = { pt, en, es }
