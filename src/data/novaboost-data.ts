export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  features: string[];
  type: 'agency' | 'desktop' | 'mobile' | 'novalink' | 'academy' | 'live' | 'tools';
}

export interface MarketProblem {
  id: string;
  problemTitle: string;
  problemDesc: string;
  solutionTitle: string;
  solutionDesc: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
}

export interface RevenueStream {
  id: string;
  title: string;
  category: 'Recurring Revenue' | 'Variable Revenue';
  type: string;
  description: string;
  monetization: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  period: string;
  status: 'completed' | 'in_progress' | 'planned';
  description: string;
  milestones: string[];
}

export interface SystemStatusItem {
  module: string;
  status: 'Ready' | 'In Development' | 'Configured' | 'Deployed';
  details: string;
  category: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: string;
  size: string;
  updated: string;
  available: boolean;
  description: string;
  contentSnippet: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Investment' | 'Product' | 'Legal' | 'Roadmap';
}

// Exact official Seed Round terms
export const SEED_ROUND_TERMS = {
  roundName: "Seed Round 2026",
  targetAmountUSD: 10000,
  maxEquityPercent: 10.0,
  minInvestmentUSD: 3000,
  impliedValuationUSD: 100000,
  currency: "USD",
  legalStructure: "Инвестиционное соглашение / Convertible Note / Equity Safe",
};

// Ecosystem Products
export const ECOSYSTEM_PRODUCTS: ProductItem[] = [
  {
    id: "agency",
    name: "NovaBoost Agency",
    tagline: "B2B Продвижение и агентские решения",
    description: "Профессиональные сервисы комплексного продвижения стримеров, создания медиа-кампаний и работы с брендами.",
    badge: "B2B / Monetized",
    features: ["Медиа-планирование", "Прямые контракты с брендами", "Менеджмент талантов", "Аналитика охватов"],
    type: "agency"
  },
  {
    id: "desktop",
    name: "NovaBoost Desktop",
    tagline: "Флагманский софт для стримеров",
    description: "Мощное десктопное приложение для управления трансляцией, виджетами, интерактивными механиками и ИИ-ассистентом.",
    badge: "Desktop App",
    features: ["Управление OBS / Streamlabs", "Низкая задержка", "ИИ-оверлеи в реальном времени", "Оптимизация GPU"],
    type: "desktop"
  },
  {
    id: "mobile",
    name: "NovaBoost Mobile",
    tagline: "Мобильный центр управления и IRL-стриминг",
    description: "Приложение для управления эфиром на ходу, мобильного IRL-стриминга, чата и мгновенных уведомлений.",
    badge: "iOS / Android",
    features: ["IRL-стриминг с битрейт-защитой", "Удаленный пульт эфира", "Push-уведомления о донатах", "Мобильная аналитика"],
    type: "mobile"
  },
  {
    id: "novalink",
    name: "NovaLink",
    tagline: "Инфраструктурный шлюз и маркетплейс",
    description: "Протокол связки стримеров, рекламодателей и зрителей. Обеспечивает безопасные микротранзакции и интеграцию плагинов.",
    badge: "Infrastructure",
    features: ["Безопасные микроплатежи", "API для разработчиков плагинов", "Смарт-маршрутизация потоков", "Автоматические выплаты"],
    type: "novalink"
  },
  {
    id: "academy",
    name: "NovaBoost Academy",
    tagline: "Образовательная платформа для авторов",
    description: "База знаний, интерактивные курсы, мастер-классы и менторство для роста аудитории и монетизации стрима.",
    badge: "EdTech",
    features: ["Курсы по продвижению", "Разбор стримов экспертами", "База готовых пресетов", "Закрытый комьюнити-клуб"],
    type: "academy"
  },
  {
    id: "live",
    name: "NovaBoost LIVE",
    tagline: "Платформа интерактивных эвентов",
    description: "Модуль проведения шоу, турниров и интерактивных трансляций с высокой степенью вовлечения зрителей.",
    badge: "Interactive LIVE",
    features: ["Интерактивные голосования", "Турнирные сетки в эфире", "Мультистриминг", "Донат-механики в режиме реального времени"],
    type: "live"
  },
  {
    id: "tools",
    name: "NovaBoost Tools",
    tagline: "Набор утилит и виджетов",
    description: "Коллекция высокопроизводительных веб-виджетов, алеров, счетчиков и ИИ-инструментов генерации контента.",
    badge: "SaaS Tools",
    features: ["Генератор алеров", "ИИ-клипер моментов", "Интерактивный чат-бот", "Кастомные CSS темы"],
    type: "tools"
  }
];

// Ecosystem Flow steps
export const ECOSYSTEM_FLOW = [
  { step: "01", title: "NovaBoost Agency", desc: "Привлечение крупных стримеров и рекламодателей, генерация первичного B2B дохода." },
  { step: "02", title: "Desktop Application", desc: "Установка профессионального рабочего места стримера с интеграцией инструментов." },
  { step: "03", title: "Mobile Companion", desc: "Подключение мобильного управления и расширение присутствия в IRL-стриминге." },
  { step: "04", title: "NovaLink Gateway", desc: "Шлюз микротранзакций, комиссий и автоматизации взаимодействий." },
  { step: "05", title: "NovaBoost Academy", desc: "Обучение авторов, рост удержания пользователей и повышение качества контента." },
  { step: "06", title: "NovaBoost LIVE", desc: "Масштабирование вовлечения через интерактивные события и турниры." },
  { step: "07", title: "Рост ценности пользователя", desc: "Увеличение LTV, удерживаемости и маржинальности всей экосистемы." }
];

// Market Problems & Solutions
export const MARKET_PROBLEMS: MarketProblem[] = [
  {
    id: "p1",
    problemTitle: "Разрозненность софта для стриминга",
    problemDesc: "Стримерам приходится использовать 5-7 разных платных сервисов для донатов, виджетов, модерации, ОБС плагинов и аналитики.",
    solutionTitle: "Единая экосистема NovaBoost",
    solutionDesc: "Все ключевые инструменты объединены в одном интерфейсе с бесшовной синхронизацией данных и единой подпиской."
  },
  {
    id: "p2",
    problemTitle: "Высокий порог монетизации для начинающих",
    problemDesc: "Начинающие авторы не могут получить рекламные контракты и страдают от комиссий сторонних сервисов выводов.",
    solutionTitle: "NovaLink & Agency монетизация",
    solutionDesc: "Прямой доступ к микрорекламе, спонсорским интеграциям и прозрачным комиссиям с первого дня."
  },
  {
    id: "p3",
    problemTitle: "Низкая интерактивность зрителей",
    problemDesc: "Классические донаты устарели. Зрители хотят оказывать прямое влияние на ход трансляции в режиме реального времени.",
    solutionTitle: "NovaBoost LIVE Интерактив",
    solutionDesc: "Игровые механики, триггеры на эфир через ИИ, мгновенное изменение сцен и интерактивные челенджи."
  },
  {
    id: "p4",
    problemTitle: "Сложность IRL и мобильного стриминга",
    problemDesc: "Стриминг вне дома требует дорогого оборудования и страдает от нестабильной связи.",
    solutionTitle: "NovaBoost Mobile с алгоритмом защиты потока",
    solutionDesc: "Оптимизированный софт для смартфонов с адаптивным битрейтом и дублированием каналов связи."
  },
  {
    id: "p5",
    problemTitle: "Отсутствие аналитики роста автора",
    problemDesc: "Стримеры не понимают, почему падают просмотры и как удерживать аудиторию.",
    solutionTitle: "NovaBoost Academy & AI-аналитика",
    solutionDesc: "ИИ-анализ записей эфиров, рекомендации по удержанию аудитории и обучающие программы."
  }
];

// Why NovaBoost (Core Advantages)
export const WHY_NOVABOOST: AdvantageItem[] = [
  {
    id: "adv1",
    title: "Единая экосистема",
    description: "Все продукты связаны между собой. Пользователь одного модуля естественным образом становится клиентом других.",
    iconName: "Layers",
    badge: "Synergy"
  },
  {
    id: "adv2",
    title: "Несколько источников дохода",
    description: "Бизнес не зависит от одного сервиса: доход формируется из B2B агентства, B2C подписок, комиссий и образовательных программ.",
    iconName: "TrendingUp",
    badge: "Diversified"
  },
  {
    id: "adv3",
    title: "Общая инфраструктура",
    description: "Серверная база, ИИ-модели и платежные шлюзы NovaLink используются во всех продуктах, снижая операционные затраты.",
    iconName: "Server",
    badge: "Efficient"
  },
  {
    id: "adv4",
    title: "Высокая масштабируемость",
    description: "Архитектура спроектирована под географическую экспансию без экспоненциального роста расходов на команду.",
    iconName: "Globe",
    badge: "Scalable"
  },
  {
    id: "adv5",
    title: "ИИ в основе продукта",
    description: "Автоматическая нарезка хайлайтов, умные оверлеи и модерация чата на базе собственных промптов и алгоритмов.",
    iconName: "Sparkles",
    badge: "AI Powered"
  },
  {
    id: "adv6",
    title: "Собственная разработка",
    description: "100% код принадлежит компании. Отсутствие критической зависимости от сторонних закрытых франшиз.",
    iconName: "Code",
    badge: "In-House"
  }
];

// Business Model
export const BUSINESS_MODEL: RevenueStream[] = [
  {
    id: "bm1",
    title: "NovaBoost Agency",
    category: "Variable Revenue",
    type: "B2B Комиссии & Контракты",
    description: "Комиссия за проведение рекламных кампаний брендов у стримеров, продюсирование и спецпроекты.",
    monetization: "Маржа 15-30% от бюджета рекламной кампании"
  },
  {
    id: "bm2",
    title: "Desktop Subscription",
    category: "Recurring Revenue",
    type: "B2C SaaS Подписка",
    description: "Ежемесячная подписка на расширенный десктопный софт, ИИ-ассистента и PRO-виджеты.",
    monetization: "Регулярная подписка (Tier 1 / Tier 2 / PRO)"
  },
  {
    id: "bm3",
    title: "Mobile Subscription",
    category: "Recurring Revenue",
    type: "B2C SaaS / In-App",
    description: "Платный функционал IRL-стриминга, облачной записи и безлимитного битрейт-буста.",
    monetization: "Ежемесячные и годовые In-App подписки"
  },
  {
    id: "bm4",
    title: "NovaLink Commission",
    category: "Variable Revenue",
    type: "Transaction Fee",
    description: "Процент за проведение микротранзакций, выплаты донатов и маркетплейс оверлеев/плагинов.",
    monetization: "Комиссия с транзакций и продажа плагинов"
  },
  {
    id: "bm5",
    title: "NovaBoost Academy",
    category: "Recurring Revenue",
    type: "EdTech Subscriptions & Courses",
    description: "Доступ к премиальным обучающим курсам, мастер-классам и персональному менторству.",
    monetization: "Разовые покупки курсов и клубная подписка"
  },
  {
    id: "bm6",
    title: "NovaBoost LIVE",
    category: "Variable Revenue",
    type: "Interactive Events & Tickets",
    description: "Монетизация шоу-эвентов, турнирных билетов и специализированных донат-механик.",
    monetization: "Доля от спонсорских сборов и интерактивных продаж"
  }
];

// Financial Revenue Structure (Data for Donut Charts)
export const REVENUE_STRUCTURE = {
  categories: [
    { label: "Recurring Revenue (SaaS Subscriptions & Academy)", value: 55, color: "#38bdf8" },
    { label: "Variable Revenue (Agency, NovaLink Fees, LIVE Events)", value: 45, color: "#818cf8" }
  ]
};

// Investment Allocation Structure
export const USE_OF_FUNDS = [
  { name: "Разработка (Core Dev & AI)", description: "Усиление десктопного и мобильного ядра, поддержка ИИ алгоритмов", color: "#38bdf8" },
  { name: "Инфраструктура & Серверы", description: "Облачные серверы с низкой задержкой, CDN, шлюзы обработки медиа", color: "#818cf8" },
  { name: "Маркетинг & Привлечение", description: "Тестирование каналов привлечения стримеров, работа с авторами", color: "#c084fc" },
  { name: "Юридическое сопровождение", description: "Оформление интеллектуальной собственности, договоры с инвесторами", color: "#f43f5e" },
  { name: "Операционный резерв", description: "Обеспечение стабильности текущих сервисов и непрерывности работы", color: "#34d399" }
];

// Roadmap
export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: "Этап I",
    title: "Public Launch & MVP Hardening",
    period: "Q1 - Q2 2026",
    status: "in_progress",
    description: "Публичный запуск базовой экосистемы NovaBoost, релиз десктопной версии и запуск первой очереди NovaBoost Agency.",
    milestones: [
      "Релиз NovaBoost Desktop 1.0 (Windows / macOS)",
      "Запуск сервиса NovaBoost Agency и первые B2B контракты",
      "Бета-тестирование шлюза NovaLink",
      "Начало регистраций в NovaBoost Academy"
    ]
  },
  {
    phase: "Этап II",
    title: "Growth & Mobile Companion",
    period: "Q3 2026",
    status: "planned",
    description: "Запуск мобильного приложения NovaBoost Mobile для iOS и Android. Расширение функционала ИИ-ассистента.",
    milestones: [
      "Запуск NovaBoost Mobile (App Store & Google Play)",
      "Интеграция IRL-протокола с адаптивным битрейтом",
      "Запуск подписочной модели Desktop PRO",
      "Расширение пула партнеров в Agency"
    ]
  },
  {
    phase: "Этап III",
    title: "Ecosystem Expansion & LIVE Events",
    period: "Q4 2026",
    status: "planned",
    description: "Запуск платформы NovaBoost LIVE для интерактивных шоу и киберспортивных ивентов. Открытие маркетплейса плагинов.",
    milestones: [
      "Публичный старт NovaBoost LIVE",
      "Маркетплейс сторонних виджетов на NovaLink",
      "Запуск масштабируемой реферальной программы для авторов",
      "Формирование первых системных отчетов для инвесторов"
    ]
  },
  {
    phase: "Этап IV",
    title: "International Scaling & Series A Prep",
    period: "2027",
    status: "planned",
    description: "Локализация продуктов под международные рынки (LATAM, MENA, EU). Подготовка к раунду Series A.",
    milestones: [
      "Локализация на 5 дополнительных языков",
      "Подключение международных платежных провайдеров",
      "Выход на институциональный показатель MRR",
      "Старт переговоров по Series A раунду"
    ]
  }
];

// System Status Checklist
export const SYSTEM_STATUS_CHECKLIST: SystemStatusItem[] = [
  { module: "Архитектурный дизайн", status: "Ready", details: "Микросервисная архитектура с поддержкой высокой нагрузки", category: "Core" },
  { module: "NovaBoost Agency", status: "Ready", details: "Проработанная модель взаимодействия с рекламодателями", category: "Business" },
  { module: "Backend Infrastructure", status: "Deployed", details: "Облачные инстансы, WebSocket серверы реального времени", category: "Tech" },
  { module: "Desktop Application", status: "Ready", details: "Готовый интерфейс и интеграция с видео-потоками", category: "Software" },
  { module: "Mobile Companion", status: "In Development", details: "Прототип клиента для iOS/Android в стадии сборки", category: "Software" },
  { module: "NovaBoost Academy", status: "Ready", details: "Контентная структура и курсовая платформа", category: "Product" },
  { module: "NovaBoost LIVE", status: "In Development", details: "Модуль проведения стрим-шоу и интерактивных викторин", category: "Product" },
  { module: "NovaLink Gateway", status: "Configured", details: "Протоколы авторизации и обработка транзакций", category: "Tech" },
  { module: "Юридическая документация", status: "Configured", details: "Шаблоны соглашений, конфиденциальности и Seed-термшит", category: "Legal" },
  { module: "Инфраструктура & Домены", status: "Deployed", details: "Зарегистрированные целевые домены и SSL-защита", category: "DevOps" }
];

// Investment Documents
export const INVESTMENT_DOCUMENTS: DocumentItem[] = [
  {
    id: "memo",
    title: "Investment Memorandum Seed 2026",
    type: "PDF Document",
    size: "1.8 MB",
    updated: "2026-07",
    available: true,
    description: "Полное инвестиционное резюме проекта NovaBoost: структура раунда $10,000 USD, юридические условия, архитектура экосистемы и порядок закрытия сделки.",
    contentSnippet: "Официальный инвестиционный меморандум NovaBoost Seed Round 2026. Объем привлекаемого финансирования: $10,000 USD за долю до 10%. Минимальный чек: $3,000 USD. Цель: финализация базовой экосистемы и запуск B2B продаж."
  },
  {
    id: "deck",
    title: "NovaBoost Pitch Deck 2026",
    type: "PDF Presentation",
    size: "4.2 MB",
    updated: "2026-07",
    available: true,
    description: "Презентация проекта для инвесторов: визуальный разбор продуктов, проблемы рынка, бизнес-модель и архитектурное преимущество.",
    contentSnippet: "Слайдовая презентация NovaBoost: концепт 'Next Generation Streaming Ecosystem', 7 ключевых модулей, сравнительный анализ с существующими решениями."
  },
  {
    id: "terms",
    title: "Term Sheet & Legal Framework",
    type: "PDF Summary",
    size: "850 KB",
    updated: "2026-07",
    available: true,
    description: "Ключевые юридические параметры инвестиционного соглашения и порядок передачи доли.",
    contentSnippet: "Основные условия инвестирования: фиксированная оценка раунда, права инвестора, порядок оформления и условия последующих раундов."
  }
];

// Comprehensive FAQs (18 questions based on official memorandum)
export const FAQ_LIST: FaqItem[] = [
  {
    id: "faq-1",
    category: "Investment",
    question: "Почему раунд составляет именно $10,000 USD?",
    answer: "Раунд Seed 2026 носит целевой характер. Данная сумма точно рассчитана на запуск публичной версии экосистемы, регистрацию интеллектуальной собственности и обеспечение юридического сопровождения сделки без размытия капитала основателей."
  },
  {
    id: "faq-2",
    category: "Investment",
    question: "Почему выделяется именно до 10% доли компании?",
    answer: "10% — это сбалансированная доля для Seed-раунда объемом $10,000 USD (оценка компании $100,000 USD), которая дает инвестору значимое участие в проекте, сохраняя при этом мотивационный контроль основателя для следующих этапов привлечения."
  },
  {
    id: "faq-3",
    category: "Investment",
    question: "Какова минимальная сумма чека для участия?",
    answer: "Минимальный чек составляет $3,000 USD. Это позволяет войти в раунд как индивидуальным ангелам, так и синдицированным инвесторам."
  },
  {
    id: "faq-4",
    category: "Investment",
    question: "Есть ли обещания или гарантии доходности?",
    answer: "Нет. В соответствии с международными стандартами венчурного инвестирования и законодательством, мы не даем фиктивных обещаний или гарантированных процентов окупаемости. Инвестиции в технологические стартапы несут венчурный риск."
  },
  {
    id: "faq-5",
    category: "Legal",
    question: "Как юридически оформляется сделка?",
    answer: "Сделка оформляется через официальное инвестиционное соглашение (Convertible Note / SAFE / Прямое соглашение о покупке доли) с четкой фиксацией прав инвестора и условий владения."
  },
  {
    id: "faq-6",
    category: "Legal",
    question: "Как защищены права инвестора?",
    answer: "Инвестор получает закрепленные в договоре права на участие в распределении прибыли пропорционально своей доле, защиту от несанкционированного размытия на данном этапе и регулярную отчетность."
  },
  {
    id: "faq-7",
    category: "Product",
    question: "Чем NovaBoost отличается от стандартных сервисов донатов?",
    answer: "NovaBoost — это не просто виджет донатов, а целостная стриминговая экосистема, объединяющая B2B агентство, десктопный и мобильный софт, ИИ-инструменты, обучение и собственный транзакционный шлюз NovaLink."
  },
  {
    id: "faq-8",
    category: "Product",
    question: "Используются ли в проекте сторонние закрытые франшизы?",
    answer: "Нет. Вся архитектура NovaBoost разработана in-house. Код и ключевые модули полностью принадлежат компании."
  },
  {
    id: "faq-9",
    category: "Investment",
    question: "На что конкретно будут направлены привлеченные средства?",
    answer: "Средства распределяются на доработку десктопного ядра и ИИ, оплату серверной инфраструктуры, маркетинг B2B агентства, юридическое оформление и операционный резерв."
  },
  {
    id: "faq-10",
    category: "Product",
    question: "Как устроена работа ИИ в NovaBoost?",
    answer: "ИИ используется для автоматической обработки моментов эфира (хайлайты), контекстного анализа чата в реальном времени и подсказок авторам в NovaBoost Academy."
  },
  {
    id: "faq-11",
    category: "Legal",
    question: "Можно ли перед инвестированием подписать NDA?",
    answer: "Да. По запросу инвестора мы предоставляем стандартное соглашение о неразглашении (NDA) перед передачей расширенных технических материалов."
  },
  {
    id: "faq-12",
    category: "Roadmap",
    question: "Какой плановый горизонт следующего раунда (Series A / Bridge)?",
    answer: "Следующий этап финансирования запланирован на 2027 год после достижения целевых метрик платящей аудитории и B2B оборота NovaBoost Agency."
  },
  {
    id: "faq-13",
    category: "Investment",
    question: "Можно ли инвестировать всю сумму $10,000 USD единолично?",
    answer: "Да, один инвестор может забрать раунд целиком, получив максимальные 10% доли в проекте."
  },
  {
    id: "faq-14",
    category: "Product",
    question: "На каких операционных системах работает NovaBoost Desktop?",
    answer: "Основная целевая платформа — Windows 10/11 и macOS (Apple Silicon / Intel). Поддержка Linux планируется в следующих релизах."
  },
  {
    id: "faq-15",
    category: "Roadmap",
    question: "Когда планируется запуск мобильного приложения?",
    answer: "Мобильное приложение NovaBoost Mobile выйдет в рамках Этапа II (Q3 2026)."
  },
  {
    id: "faq-16",
    category: "Legal",
    question: "Как получить полный пакет документов для изучния?",
    answer: "Вы можете скачать инвестиционный меморандум прямо на сайте или оставить заявку в форме обратной связи для получения юридического пакета."
  },
  {
    id: "faq-17",
    category: "Investment",
    question: "Как происходит регулярная отчетность перед инвесторами?",
    answer: "Основатель предоставляет ежемесячные и ежеквартальные инвестиционные отчеты (Investor Update) с финансовыми и продуктовыми метриками."
  },
  {
    id: "faq-18",
    category: "Product",
    question: "Как организована работа с брендами в NovaBoost Agency?",
    answer: "Agency выступает единой точкой входа для брендов, которым нужны таргетированные интеграции в стримы, автоматизируя подбор авторов и отчетность."
  }
];

// Founder & Contact details
export const FOUNDER_INFO = {
  name: "Основатель NovaBoost",
  role: "Founder & Lead Architect",
  bio: "Разработчик и продуктовый архитектор с опытом в сфере медиа-инфраструктуры, потокового видео и стриминговых технологий.",
  email: "admin@novaboost.cloud",
  telegram: "@MrJinPro",
  tiktok: "@novabsoost.agency",
  whatsapp: "+7 (900) 000-00-00",
  location: "Global Remote / EU Tech Hub",
  calendlyUrl: "https://calendly.com/novaboost/seed-round-meeting",
};
