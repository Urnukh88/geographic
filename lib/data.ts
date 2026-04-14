export interface Topic {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  facts: string[];
}

export interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const categories = [
  {
    slug: "physical",
    name: "Физик газарзүй",
    description: "Уулс, гол мөрөн, газрын хэлбэр",
    icon: "🏔️",
    color: "#4A7C59",
    borderColor: "#4A7C59",
  },
  {
    slug: "human",
    name: "Хүний газарзүй",
    description: "Хүн ам, соёл, нийгэм",
    icon: "👥",
    color: "#7B5EA7",
    borderColor: "#7B5EA7",
  },
  {
    slug: "climate",
    name: "Уур амьсгал",
    description: "Цаг агаар, уур амьсгалын бүс",
    icon: "☁️",
    color: "#4A6B8A",
    borderColor: "#4A6B8A",
  },
  {
    slug: "countries",
    name: "Улс орнууд",
    description: "Дэлхийн улс орнууд, нийслэл",
    icon: "🚩",
    color: "#C4622D",
    borderColor: "#C4622D",
  },
  {
    slug: "ocean",
    name: "Далай тэнгис",
    description: "Далай, тэнгис, усны сан",
    icon: "🌊",
    color: "#3D7A7A",
    borderColor: "#3D7A7A",
  },
  {
    slug: "maps",
    name: "Газрын зураг",
    description: "Бүс нутаг, зураглал",
    icon: "🗺️",
    color: "#8B6340",
    borderColor: "#8B6340",
  },
  {
    slug: "nature",
    name: "Байгалийн нөөц",
    description: "Ашигт малтмал, нөөц баялаг",
    icon: "💎",
    color: "#4A7C59",
    borderColor: "#4A7C59",
  },
  {
    slug: "cities",
    name: "Хот суурин",
    description: "Том хотууд, хүн ам",
    icon: "🏙️",
    color: "#7A6A58",
    borderColor: "#7A6A58",
  },
];

// 3. Сэдвүүд (Slug-тай)
export const topics: Record<string, Topic[]> = {
  physical: [
    {
      title: "Монгол орны уулс",
      slug: "mongolian-mountains",
      description:
        "Монгол орон уулархаг нутаг бөгөөд хамгийн өндөр уул нь Алтай Таван Богд (4374м) юм.",
      tags: ["Монгол улс", "Алтай Таван Богд"],
      facts: [
        "Алтай Таван Богд – 4374м",
        "Хүйтэн уул – 4374м",
        "Хөх сэрхийн нуруу - 4000м",
      ],
    },
    {
      title: "Дэлхийн урт голууд",
      slug: "world-rivers",
      description: "Дэлхийн хамгийн урт гол бол Нил гол (6650 км) юм.",
      tags: ["Африк", "Өмнөд Америк", "Ази", "Нил гол"],
      facts: ["Нил гол – 6650 км", "Амазон – 6400 км", "Янцзы – 6300 км"],
    },
  ],
  human: [
    {
      title: "Дэлхийн хүн ам",
      slug: "world-population",
      description: "Дэлхийн хүн амын тоо 8 тэрбумд хүрсэн байна.",
      tags: ["Хүн ам", "Дэлхий"],
      facts: ["Хятад – 1.4 тэрбум", "Энэтхэг – 1.4 тэрбум", "АНУ – 335 сая"],
    },
  ],
  climate: [
    {
      title: "Уур амьсгалын бүсүүд",
      slug: "climate-zones",
      description: "Дэлхий дээр 5 үндсэн уур амьсгалын бүс байдаг.",
      tags: ["Уур амьсгал", "Бүсүүд"],
      facts: ["Халуун орны бүс", "Хуурай бүс", "Сэрүүн бүс"],
    },
  ],
  countries: [
    {
      title: "Дэлхийн улс орнууд",
      slug: "world-countries",
      description: "Дэлхий дээр 195 бүрэн эрхт улс байдаг.",
      tags: ["Улс орнууд", "НҮБ"],
      facts: [
        "Нийт улс – 195",
        "Хамгийн том – Орос",
        "Хамгийн жижиг – Ватикан",
      ],
    },
  ],
  ocean: [
    {
      title: "Дэлхийн далайнууд",
      slug: "world-oceans",
      description: "Дэлхий дээр 5 их далай байдаг.",
      tags: ["Далай", "Ус"],
      facts: ["Номхон далай", "Атлантын далай", "Энэтхэгийн далай"],
    },
  ],
  maps: [
    {
      title: "Газрын зураг зүй",
      slug: "cartography",
      description: "Картографи нь газрын зураг зохиох шинжлэх ухаан юм.",
      tags: ["Картографи", "Зураглал"],
      facts: ["Меркатор проекц", "GPS технологи", "Дижитал зураглал"],
    },
  ],
  nature: [
    {
      title: "Ашигт малтмал",
      slug: "natural-resources",
      description: "Монгол улс нь зэс, нүүрс, алт зэрэг баялаг нөөцтэй.",
      tags: ["Монгол", "Уул уурхай"],
      facts: ["Зэс – Оюу Толгой", "Нүүрс – Тавантолгой", "Алт – Замын-Үүд"],
    },
  ],
  cities: [
    {
      title: "Дэлхийн мегаполисууд",
      slug: "mega-cities",
      description: "Токио дэлхийн хамгийн том хот бөгөөд 37 сая хүн амтай.",
      tags: ["Хот", "Хүн ам"],
      facts: ["Токио – 37 сая", "Дели – 33 сая", "Шанхай – 29 сая"],
    },
  ],
};

// 4. Тестүүд
export const quizQuestions: Record<string, Question[]> = {
  physical: [
    {
      question: "Монгол орны хамгийн өндөр уул аль нь вэ?",
      options: ["Богд уул", "Алтай Таван Богд", "Хүйтэн уул", "Цамбагарав"],
      correct: 1,
      explanation:
        "Алтай Таван Богд нь 4374 метр өндөртэй Монголын хамгийн өндөр уул юм.",
    },
    {
      question: "Дэлхийн хамгийн урт гол аль вэ?",
      options: ["Амазон", "Янцзы", "Нил", "Миссисипи"],
      correct: 2,
      explanation: "Нил гол 6650 км урттай дэлхийн хамгийн урт гол юм.",
    },
  ],
  human: [
    {
      question: "Дэлхийн хүн ам хэд вэ?",
      options: ["6 тэрбум", "7 тэрбум", "8 тэрбум", "9 тэрбум"],
      correct: 2,
      explanation: "2022 онд дэлхийн хүн ам 8 тэрбумд хүрсэн.",
    },
  ],
  climate: [
    {
      question: "Дэлхийн хамгийн халуун цөл аль вэ?",
      options: ["Сахар", "Гоби", "Атакама", "Арабын цөл"],
      correct: 0,
      explanation: "Сахар цөл дэлхийн хамгийн том халуун цөл юм.",
    },
  ],
  countries: [
    {
      question: "Дэлхийн хамгийн том улс аль вэ?",
      options: ["Хятад", "Канад", "АНУ", "Орос"],
      correct: 3,
      explanation:
        "Орос улс 17.1 сая км² талбайтай дэлхийн хамгийн том улс юм.",
    },
  ],
  ocean: [
    {
      question: "Дэлхийн хамгийн том далай аль вэ?",
      options: [
        "Атлантын далай",
        "Номхон далай",
        "Энэтхэгийн далай",
        "Хойд мөсөн далай",
      ],
      correct: 1,
      explanation: "Номхон далай дэлхийн хамгийн том далай юм.",
    },
  ],
  maps: [
    {
      question: "GPS товчлол юуг илэрхийлэх вэ?",
      options: [
        "Global Position System",
        "Global Positioning System",
        "General Position Satellite",
        "Geographic Position System",
      ],
      correct: 1,
      explanation: "GPS нь Global Positioning System гэсэн үгийн товчлол юм.",
    },
  ],
  nature: [
    {
      question: "Монголын хамгийн том зэсний уурхай аль вэ?",
      options: ["Тавантолгой", "Эрдэнэт", "Оюу Толгой", "Замын-Үүд"],
      correct: 2,
      explanation: "Оюу Толгой нь Монголын хамгийн том зэс-алтны уурхай юм.",
    },
  ],
  cities: [
    {
      question: "Дэлхийн хамгийн том хот аль вэ?",
      options: ["Бээжин", "Токио", "Нью-Йорк", "Мумбай"],
      correct: 1,
      explanation: "Токио 37 сая гаруй хүн амтай дэлхийн хамгийн том хот юм.",
    },
  ],
};
