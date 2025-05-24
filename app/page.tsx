"use client"

import { useState, useEffect, useRef } from "react"
import {
  Moon,
  Sun,
  Shuffle,
  Film,
  Sparkles,
  Mic,
  MicOff,
  Play,
  Clock,
  Cloud,
  Save,
  History,
  MessageCircle,
  Filter,
  Search,
  Globe,
} from "lucide-react"

interface Movie {
  id: number
  title: string
  year: number
  genre: string
  description: string
  rating: number
  poster: string
  trailer: string
  director: string
  cast: string[]
  runtime: number
}

interface MoviesByRegion {
  [region: string]: {
    [mood: string]: {
      emoji: string
      color: string
      movies: Movie[]
    }
  }
}

const moviesByRegion: MoviesByRegion = {
  hollywood: {
    happy: {
      emoji: "😊",
      color: "from-yellow-200 to-orange-200",
      movies: [
        {
          id: 1,
          title: "The Grand Budapest Hotel",
          year: 2014,
          genre: "Comedy",
          description: "A whimsical adventure through a famous European hotel between the wars.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=1Fg5iWmQjwk",
          director: "Wes Anderson",
          cast: ["Ralph Fiennes", "F. Murray Abraham"],
          runtime: 99,
        },
        {
          id: 2,
          title: "Paddington 2",
          year: 2017,
          genre: "Family",
          description: "A charming bear brings joy to everyone around him.",
          rating: 8.2,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=BeaHZvKy1hA",
          director: "Paul King",
          cast: ["Hugh Bonneville", "Sally Hawkins"],
          runtime: 103,
        },
      ],
    },
    sad: {
      emoji: "😢",
      color: "from-blue-200 to-indigo-200",
      movies: [
        {
          id: 3,
          title: "Inside Out",
          year: 2015,
          genre: "Animation",
          description: "A beautiful exploration of emotions and growing up.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=yRUAzGQ3nSY",
          director: "Pete Docter",
          cast: ["Amy Poehler", "Phyllis Smith"],
          runtime: 95,
        },
      ],
    },
    excited: {
      emoji: "🤯",
      color: "from-red-200 to-pink-200",
      movies: [
        {
          id: 4,
          title: "Mad Max: Fury Road",
          year: 2015,
          genre: "Action",
          description: "High-octane post-apocalyptic action adventure.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
          director: "George Miller",
          cast: ["Tom Hardy", "Charlize Theron"],
          runtime: 120,
        },
      ],
    },
    romantic: {
      emoji: "❤️",
      color: "from-pink-200 to-rose-200",
      movies: [
        {
          id: 5,
          title: "Titanic",
          year: 1997,
          genre: "Romance",
          description: "A timeless love story aboard the ill-fated ship.",
          rating: 7.9,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=2e-eXJ6HgkQ",
          director: "James Cameron",
          cast: ["Leonardo DiCaprio", "Kate Winslet"],
          runtime: 194,
        },
      ],
    },
    adventurous: {
      emoji: "🗺️",
      color: "from-green-200 to-emerald-200",
      movies: [
        {
          id: 6,
          title: "Indiana Jones: Raiders of the Lost Ark",
          year: 1981,
          genre: "Adventure",
          description: "An archaeologist races against Nazis to find the Ark.",
          rating: 8.5,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=XkkzKHQAeqw",
          director: "Steven Spielberg",
          cast: ["Harrison Ford", "Karen Allen"],
          runtime: 115,
        },
      ],
    },
    mysterious: {
      emoji: "🕵️",
      color: "from-purple-200 to-violet-200",
      movies: [
        {
          id: 7,
          title: "The Prestige",
          year: 2006,
          genre: "Mystery",
          description: "Two magicians engage in a deadly rivalry.",
          rating: 8.5,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=o4gHCmTQDVI",
          director: "Christopher Nolan",
          cast: ["Christian Bale", "Hugh Jackman"],
          runtime: 130,
        },
      ],
    },
  },
  bollywood: {
    happy: {
      emoji: "😊",
      color: "from-yellow-200 to-orange-200",
      movies: [
        {
          id: 8,
          title: "3 Idiots",
          year: 2009,
          genre: "Comedy",
          description: "Three friends embark on a hilarious journey of self-discovery.",
          rating: 8.4,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
          director: "Rajkumar Hirani",
          cast: ["Aamir Khan", "R. Madhavan"],
          runtime: 170,
        },
      ],
    },
    sad: {
      emoji: "😢",
      color: "from-blue-200 to-indigo-200",
      movies: [
        {
          id: 9,
          title: "Taare Zameen Par",
          year: 2007,
          genre: "Drama",
          description: "A teacher helps a dyslexic child overcome difficulties.",
          rating: 8.4,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=AkoML0_FiV4",
          director: "Aamir Khan",
          cast: ["Aamir Khan", "Darsheel Safary"],
          runtime: 165,
        },
      ],
    },
    excited: {
      emoji: "🤯",
      color: "from-red-200 to-pink-200",
      movies: [
        {
          id: 10,
          title: "Dangal",
          year: 2016,
          genre: "Sports",
          description: "A former wrestler trains his daughters to become champions.",
          rating: 8.4,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=x_7YlGv9u1g",
          director: "Nitesh Tiwari",
          cast: ["Aamir Khan", "Fatima Sana Shaikh"],
          runtime: 161,
        },
      ],
    },
    romantic: {
      emoji: "❤️",
      color: "from-pink-200 to-rose-200",
      movies: [
        {
          id: 11,
          title: "Dilwale Dulhania Le Jayenge",
          year: 1995,
          genre: "Romance",
          description: "A young couple falls in love during a trip to Europe.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=Hgz0as4fWbQ",
          director: "Aditya Chopra",
          cast: ["Shah Rukh Khan", "Kajol"],
          runtime: 189,
        },
      ],
    },
    adventurous: {
      emoji: "🗺️",
      color: "from-green-200 to-emerald-200",
      movies: [
        {
          id: 12,
          title: "Lagaan",
          year: 2001,
          genre: "Adventure",
          description: "Villagers challenge British officers to a cricket match.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=K_a4HNaUz5c",
          director: "Ashutosh Gowariker",
          cast: ["Aamir Khan", "Gracy Singh"],
          runtime: 224,
        },
      ],
    },
    mysterious: {
      emoji: "🕵️",
      color: "from-purple-200 to-violet-200",
      movies: [
        {
          id: 13,
          title: "Kahaani",
          year: 2012,
          genre: "Thriller",
          description: "A pregnant woman searches for her missing husband.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=Wq4tyDRhX_c",
          director: "Sujoy Ghosh",
          cast: ["Vidya Balan", "Parambrata Chatterjee"],
          runtime: 122,
        },
      ],
    },
  },
  korean: {
    happy: {
      emoji: "😊",
      color: "from-yellow-200 to-orange-200",
      movies: [
        {
          id: 14,
          title: "My Sassy Girl",
          year: 2001,
          genre: "Romance",
          description: "A college student's life changes when he meets an unpredictable girl.",
          rating: 8.0,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=HlaESKjKosA",
          director: "Kwak Jae-yong",
          cast: ["Jun Ji-hyun", "Cha Tae-hyun"],
          runtime: 123,
        },
      ],
    },
    sad: {
      emoji: "😢",
      color: "from-blue-200 to-indigo-200",
      movies: [
        {
          id: 15,
          title: "Miracle in Cell No. 7",
          year: 2013,
          genre: "Drama",
          description: "A mentally disabled man wrongly imprisoned forms bonds.",
          rating: 8.2,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=Iyp3jQZhaps",
          director: "Lee Hwan-kyung",
          cast: ["Ryu Seung-ryong", "Kal So-won"],
          runtime: 127,
        },
      ],
    },
    excited: {
      emoji: "🤯",
      color: "from-red-200 to-pink-200",
      movies: [
        {
          id: 16,
          title: "Train to Busan",
          year: 2016,
          genre: "Action",
          description: "Passengers fight for survival during a zombie outbreak.",
          rating: 7.6,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=pyWuHv2-Abk",
          director: "Yeon Sang-ho",
          cast: ["Gong Yoo", "Jung Yu-mi"],
          runtime: 118,
        },
      ],
    },
    romantic: {
      emoji: "❤️",
      color: "from-pink-200 to-rose-200",
      movies: [
        {
          id: 17,
          title: "20th Century Girl",
          year: 2022,
          genre: "Romance",
          description: "A teenage girl in 1999 helps her friend but falls in love herself.",
          rating: 7.4,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=jYSlpC6Ud2A",
          director: "Bang Woo-ri",
          cast: ["Kim Yoo-jung", "Byeon Woo-seok"],
          runtime: 119,
        },
      ],
    },
    adventurous: {
      emoji: "🗺️",
      color: "from-green-200 to-emerald-200",
      movies: [
        {
          id: 18,
          title: "The Admiral: Roaring Currents",
          year: 2014,
          genre: "Adventure",
          description: "Admiral Yi Sun-sin faces the Japanese navy.",
          rating: 7.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=VA8hzUDXvtk",
          director: "Kim Han-min",
          cast: ["Choi Min-sik", "Ryu Seung-ryong"],
          runtime: 128,
        },
      ],
    },
    mysterious: {
      emoji: "🕵️",
      color: "from-purple-200 to-violet-200",
      movies: [
        {
          id: 19,
          title: "Parasite",
          year: 2019,
          genre: "Thriller",
          description: "A poor family schemes to infiltrate a wealthy household.",
          rating: 8.5,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
          director: "Bong Joon-ho",
          cast: ["Song Kang-ho", "Lee Sun-kyun"],
          runtime: 132,
        },
      ],
    },
  },
  chinese: {
    happy: {
      emoji: "😊",
      color: "from-yellow-200 to-orange-200",
      movies: [
        {
          id: 20,
          title: "Kung Fu Hustle",
          year: 2004,
          genre: "Comedy",
          description: "A wannabe gangster aspires to join the notorious Axe Gang.",
          rating: 7.8,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=jxmZZBJQAKM",
          director: "Stephen Chow",
          cast: ["Stephen Chow", "Wah Yuen"],
          runtime: 99,
        },
      ],
    },
    sad: {
      emoji: "😢",
      color: "from-blue-200 to-indigo-200",
      movies: [
        {
          id: 21,
          title: "Farewell My Concubine",
          year: 1993,
          genre: "Drama",
          description: "Two Peking opera stars navigate their complex relationship.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Chen Kaige",
          cast: ["Leslie Cheung", "Zhang Fengyi"],
          runtime: 171,
        },
      ],
    },
    excited: {
      emoji: "🤯",
      color: "from-red-200 to-pink-200",
      movies: [
        {
          id: 22,
          title: "Hero",
          year: 2002,
          genre: "Action",
          description: "A nameless warrior recounts his defeat of three assassins.",
          rating: 7.9,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Zhang Yimou",
          cast: ["Jet Li", "Tony Leung"],
          runtime: 120,
        },
      ],
    },
    romantic: {
      emoji: "❤️",
      color: "from-pink-200 to-rose-200",
      movies: [
        {
          id: 23,
          title: "In the Mood for Love",
          year: 2000,
          genre: "Romance",
          description: "Two neighbors discover their spouses are having an affair.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=58dodJiPbao",
          director: "Wong Kar-wai",
          cast: ["Tony Leung", "Maggie Cheung"],
          runtime: 98,
        },
      ],
    },
    adventurous: {
      emoji: "🗺️",
      color: "from-green-200 to-emerald-200",
      movies: [
        {
          id: 24,
          title: "House of Flying Daggers",
          year: 2004,
          genre: "Adventure",
          description: "A romantic police captain goes undercover.",
          rating: 7.5,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Zhang Yimou",
          cast: ["Zhang Ziyi", "Andy Lau"],
          runtime: 119,
        },
      ],
    },
    mysterious: {
      emoji: "🕵️",
      color: "from-purple-200 to-violet-200",
      movies: [
        {
          id: 25,
          title: "Infernal Affairs",
          year: 2002,
          genre: "Thriller",
          description: "An undercover cop and police informant try to identify each other.",
          rating: 8.0,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Andrew Lau",
          cast: ["Andy Lau", "Tony Leung"],
          runtime: 101,
        },
      ],
    },
  },
  thai: {
    happy: {
      emoji: "😊",
      color: "from-yellow-200 to-orange-200",
      movies: [
        {
          id: 26,
          title: "The Love of Siam",
          year: 2007,
          genre: "Drama",
          description: "Two childhood friends reconnect and explore their feelings.",
          rating: 7.8,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Chookiat Sakveerakul",
          cast: ["Witwisit Hiranyawongkul", "Mario Maurer"],
          runtime: 150,
        },
      ],
    },
    sad: {
      emoji: "😢",
      color: "from-blue-200 to-indigo-200",
      movies: [
        {
          id: 27,
          title: "Last Life in the Universe",
          year: 2003,
          genre: "Drama",
          description: "A suicidal Japanese man forms an unlikely friendship.",
          rating: 7.5,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Pen-Ek Ratanaruang",
          cast: ["Tadanobu Asano", "Sinitta Boonyasak"],
          runtime: 112,
        },
      ],
    },
    excited: {
      emoji: "🤯",
      color: "from-red-200 to-pink-200",
      movies: [
        {
          id: 28,
          title: "Ong-Bak: Muay Thai Warrior",
          year: 2003,
          genre: "Action",
          description: "A young fighter uses ancient Muay Thai to recover a stolen statue.",
          rating: 7.2,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Prachya Pinkaew",
          cast: ["Tony Jaa", "Petchtai Wongkamlao"],
          runtime: 105,
        },
      ],
    },
    romantic: {
      emoji: "❤️",
      color: "from-pink-200 to-rose-200",
      movies: [
        {
          id: 29,
          title: "Dear Galileo",
          year: 2009,
          genre: "Romance",
          description: "Two friends travel to Europe to find themselves.",
          rating: 7.3,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Nithiwat Tharathorn",
          cast: ["Chutavuth Pattarakampol", "Jarinporn Joonkiat"],
          runtime: 130,
        },
      ],
    },
    adventurous: {
      emoji: "🗺️",
      color: "from-green-200 to-emerald-200",
      movies: [
        {
          id: 30,
          title: "Bang Rajan",
          year: 2000,
          genre: "Adventure",
          description: "Villagers defend their homeland against Burmese invaders.",
          rating: 6.9,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Tanit Jitnukul",
          cast: ["Jaran Ngamdee", "Atthakorn Suwannaraj"],
          runtime: 113,
        },
      ],
    },
    mysterious: {
      emoji: "🕵️",
      color: "from-purple-200 to-violet-200",
      movies: [
        {
          id: 31,
          title: "Shutter",
          year: 2004,
          genre: "Horror",
          description: "A photographer discovers mysterious shadows in his photos.",
          rating: 7.0,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Banjong Pisanthanakun",
          cast: ["Ananda Everingham", "Natthaweeranuch Thongmee"],
          runtime: 97,
        },
      ],
    },
  },
  tollywood: {
    happy: {
      emoji: "😊",
      color: "from-yellow-200 to-orange-200",
      movies: [
        {
          id: 32,
          title: "Arjun Reddy",
          year: 2017,
          genre: "Drama",
          description: "A brilliant but self-destructive surgeon spirals into alcoholism.",
          rating: 8.1,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=hmHVo11VqWE",
          director: "Sandeep Reddy Vanga",
          cast: ["Vijay Deverakonda", "Shalini Pandey"],
          runtime: 182,
        },
      ],
    },
    sad: {
      emoji: "😢",
      color: "from-blue-200 to-indigo-200",
      movies: [
        {
          id: 33,
          title: "Jersey",
          year: 2019,
          genre: "Drama",
          description: "A failed cricketer decides to revive his career for his son.",
          rating: 8.5,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Gowtam Tinnanuri",
          cast: ["Nani", "Shraddha Srinath"],
          runtime: 157,
        },
      ],
    },
    excited: {
      emoji: "🤯",
      color: "from-red-200 to-pink-200",
      movies: [
        {
          id: 34,
          title: "Baahubali: The Beginning",
          year: 2015,
          genre: "Action",
          description: "A young man learns about his heritage and seeks to rescue his mother.",
          rating: 8.0,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=sOEg_YZQsTI",
          director: "S.S. Rajamouli",
          cast: ["Prabhas", "Rana Daggubati"],
          runtime: 159,
        },
      ],
    },
    romantic: {
      emoji: "❤️",
      color: "from-pink-200 to-rose-200",
      movies: [
        {
          id: 35,
          title: "96",
          year: 2018,
          genre: "Romance",
          description: "Two high school sweethearts meet after 22 years.",
          rating: 8.5,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "C. Prem Kumar",
          cast: ["Vijay Sethupathi", "Trisha"],
          runtime: 158,
        },
      ],
    },
    adventurous: {
      emoji: "🗺️",
      color: "from-green-200 to-emerald-200",
      movies: [
        {
          id: 36,
          title: "Eega",
          year: 2012,
          genre: "Fantasy",
          description: "A man reincarnated as a fly seeks revenge on his killer.",
          rating: 7.7,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "S.S. Rajamouli",
          cast: ["Nani", "Samantha Ruth Prabhu"],
          runtime: 134,
        },
      ],
    },
    mysterious: {
      emoji: "🕵️",
      color: "from-purple-200 to-violet-200",
      movies: [
        {
          id: 37,
          title: "Kshanam",
          year: 2016,
          genre: "Thriller",
          description: "A man returns to India to help find a missing daughter.",
          rating: 8.4,
          poster: "/placeholder.svg?height=400&width=300",
          trailer: "https://www.youtube.com/watch?v=kNVkTayNaWQ",
          director: "Ravikanth Perepu",
          cast: ["Adivi Sesh", "Adah Sharma"],
          runtime: 118,
        },
      ],
    },
  },
}

const regions = [
  { id: "hollywood", name: "Hollywood", flag: "🇺🇸", description: "American Cinema" },
  { id: "bollywood", name: "Bollywood", flag: "🇮🇳", description: "Hindi Cinema" },
  { id: "korean", name: "Korean", flag: "🇰🇷", description: "K-Cinema" },
  { id: "chinese", name: "Chinese", flag: "🇨🇳", description: "Chinese Cinema" },
  { id: "thai", name: "Thai", flag: "🇹🇭", description: "Thai Cinema" },
  { id: "tollywood", name: "Tollywood", flag: "🎬", description: "Telugu Cinema" },
]

const genres = [
  "All Genres",
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
]

const storyQuestions = [
  {
    question: "It's Friday night. What sounds most appealing?",
    options: [
      { text: "Cozy night in with comfort food", mood: "happy" },
      { text: "Deep conversation with a close friend", mood: "sad" },
      { text: "High-energy party or event", mood: "excited" },
      { text: "Romantic dinner for two", mood: "romantic" },
    ],
  },
  {
    question: "Your ideal vacation would be:",
    options: [
      { text: "Exploring ancient ruins and hidden temples", mood: "adventurous" },
      { text: "Solving puzzles in an escape room", mood: "mysterious" },
      { text: "Beach resort with endless sunshine", mood: "happy" },
      { text: "Quiet cabin in the mountains", mood: "sad" },
    ],
  },
  {
    question: "When choosing a book, you gravitate toward:",
    options: [
      { text: "Heartwarming stories with happy endings", mood: "happy" },
      { text: "Complex mysteries with plot twists", mood: "mysterious" },
      { text: "Epic adventures across distant lands", mood: "adventurous" },
      { text: "Passionate love stories", mood: "romantic" },
    ],
  },
]

export default function Cinestra() {
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [selectedRegion, setSelectedRegion] = useState<string>("hollywood")
  const [selectedGenre, setSelectedGenre] = useState<string>("All Genres")
  const [favoriteMovie, setFavoriteMovie] = useState<string>("")
  const [favoriteActor, setFavoriteActor] = useState<string>("")
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showStoryMode, setShowStoryMode] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [storyAnswers, setStoryAnswers] = useState<string[]>([])
  const [savedRecommendations, setSavedRecommendations] = useState<Movie[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [personalizedMessage, setPersonalizedMessage] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState("sunny")

  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    const saved = localStorage.getItem("savedRecommendations")
    if (saved) {
      setSavedRecommendations(JSON.parse(saved))
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const getTimeBasedRecommendation = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "happy"
    if (hour < 17) return "adventurous"
    if (hour < 21) return "excited"
    return "mysterious"
  }

  const getWeatherBasedRecommendation = () => {
    switch (weather) {
      case "rainy":
        return "sad"
      case "sunny":
        return "happy"
      case "cloudy":
        return "mysterious"
      default:
        return "happy"
    }
  }

  const generatePersonalizedMessage = (mood: string, region: string) => {
    const hour = currentTime.getHours()
    const timeOfDay = hour < 12 ? "morning" : hour < 17 ? "afternoon" : hour < 21 ? "evening" : "night"
    const regionName = regions.find((r) => r.id === region)?.name || region

    const messages = {
      happy: `You're feeling great this ${timeOfDay}! Here are some uplifting ${regionName} movies to match your positive energy.`,
      sad: `Sometimes we need a good cry or thoughtful reflection. These ${timeOfDay} ${regionName} picks will resonate with your current mood.`,
      excited: `Your energy is high this ${timeOfDay}! These action-packed ${regionName} recommendations will keep your adrenaline pumping.`,
      romantic: `Love is in the air this ${timeOfDay}! These romantic ${regionName} films will warm your heart.`,
      adventurous: `Ready for an adventure this ${timeOfDay}? These ${regionName} films will take you on incredible journeys.`,
      mysterious: `Perfect ${timeOfDay} for some mystery! These ${regionName} films will keep you guessing until the end.`,
    }

    return messages[mood as keyof typeof messages] || `Here are some great ${regionName} movie recommendations for you!`
  }

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    setShowResults(false)
    setShowStoryMode(false)
  }

  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase()

        if (transcript.includes("happy") || transcript.includes("joy")) setSelectedMood("happy")
        else if (transcript.includes("sad") || transcript.includes("cry")) setSelectedMood("sad")
        else if (transcript.includes("excited") || transcript.includes("action")) setSelectedMood("excited")
        else if (transcript.includes("romantic") || transcript.includes("love")) setSelectedMood("romantic")
        else if (transcript.includes("adventure")) setSelectedMood("adventurous")
        else if (transcript.includes("mystery") || transcript.includes("thriller")) setSelectedMood("mysterious")

        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.start()
    }
  }

  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const getRecommendations = () => {
    if (!selectedMood) return

    setIsLoading(true)
    setShowResults(false)

    setTimeout(() => {
      const regionData = moviesByRegion[selectedRegion]
      if (!regionData || !regionData[selectedMood]) {
        setRecommendations([])
        setIsLoading(false)
        return
      }

      let filteredMovies = regionData[selectedMood].movies

      if (selectedGenre !== "All Genres") {
        filteredMovies = filteredMovies.filter((movie) => movie.genre.toLowerCase() === selectedGenre.toLowerCase())
      }

      if (filteredMovies.length === 0) {
        filteredMovies = regionData[selectedMood].movies
      }

      setRecommendations(filteredMovies)
      setPersonalizedMessage(generatePersonalizedMessage(selectedMood, selectedRegion))
      setIsLoading(false)
      setShowResults(true)
    }, 1000)
  }

  const getSmartRecommendation = () => {
    const timeBasedMood = getTimeBasedRecommendation()
    const smartMood = selectedMood || timeBasedMood

    setSelectedMood(smartMood)
    setIsLoading(true)
    setShowResults(false)

    setTimeout(() => {
      const allMovies = Object.values(moviesByRegion[selectedRegion] || {}).flatMap((mood) => mood.movies)
      const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)]

      if (randomMovie) {
        setRecommendations([randomMovie])
        setPersonalizedMessage(
          `Based on the time (${currentTime.toLocaleTimeString()}) and your preferences, here's a perfect surprise pick from ${regions.find((r) => r.id === selectedRegion)?.name}!`,
        )
      }
      setIsLoading(false)
      setShowResults(true)
    }, 1000)
  }

  const saveRecommendation = (movie: Movie) => {
    const updated = [...savedRecommendations, movie]
    setSavedRecommendations(updated)
    localStorage.setItem("savedRecommendations", JSON.stringify(updated))
  }

  const startStoryMode = () => {
    setShowStoryMode(true)
    setCurrentQuestion(0)
    setStoryAnswers([])
    setShowResults(false)
  }

  const handleStoryAnswer = (mood: string) => {
    const newAnswers = [...storyAnswers, mood]
    setStoryAnswers(newAnswers)

    if (currentQuestion < storyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const moodCounts = newAnswers.reduce(
        (acc, mood) => {
          acc[mood] = (acc[mood] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const recommendedMood = Object.entries(moodCounts).reduce((a, b) =>
        moodCounts[a[0]] > moodCounts[b[0]] ? a : b,
      )[0]

      setSelectedMood(recommendedMood)
      setShowStoryMode(false)

      setTimeout(() => {
        const regionData = moviesByRegion[selectedRegion]
        if (regionData && regionData[recommendedMood]) {
          setRecommendations(regionData[recommendedMood].movies)
          setPersonalizedMessage(
            `Based on your story preferences, you're in a ${recommendedMood} mood! Here are perfect ${regions.find((r) => r.id === selectedRegion)?.name} matches:`,
          )
        }
        setShowResults(true)
      }, 500)
    }
  }

  const renderStars = (rating: number) => {
    const stars = Math.round(rating / 2)
    return "★".repeat(stars) + "☆".repeat(5 - stars)
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Film className={`w-8 h-8 ${isDarkMode ? "text-purple-300" : "text-purple-600"}`} />
              <h1
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${
                  isDarkMode ? "from-purple-300 to-pink-300" : "from-purple-600 to-pink-600"
                } bg-clip-text text-transparent`}
              >
                🎬 Cinestra
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                    : "bg-white/50 text-slate-600 hover:bg-white/70"
                }`}
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-yellow-400/20 text-yellow-300 hover:bg-yellow-400/30"
                    : "bg-slate-200/50 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <p className={`mt-4 text-lg ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
            Discover movies from around the world based on your mood and preferences ✨
          </p>

          <div className="flex items-center space-x-4 mt-4">
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isDarkMode ? "bg-slate-700/50" : "bg-white/50"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isDarkMode ? "bg-slate-700/50" : "bg-white/50"
              }`}
            >
              <Cloud className="w-4 h-4" />
              <span className="text-sm capitalize">{weather}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Saved Recommendations History */}
      {showHistory && (
        <div className="container mx-auto px-6 py-6">
          <div
            className={`p-6 rounded-2xl ${
              isDarkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white/70 border border-slate-200"
            } backdrop-blur-sm`}
          >
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              Your Saved Movies ({savedRecommendations.length})
            </h3>
            {savedRecommendations.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {savedRecommendations.map((movie, index) => (
                  <div key={index} className={`p-4 rounded-lg ${isDarkMode ? "bg-slate-700/50" : "bg-slate-50"}`}>
                    <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-slate-800"}`}>{movie.title}</h4>
                    <p className={`text-sm ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                      {movie.year} • {movie.genre}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                No saved movies yet. Start exploring and save your favorites!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Story Mode */}
          {showStoryMode ? (
            <div className="max-w-2xl mx-auto">
              <div
                className={`p-8 rounded-2xl ${
                  isDarkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white/70 border border-slate-200"
                } backdrop-blur-sm`}
              >
                <div className="text-center mb-6">
                  <MessageCircle
                    className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                  />
                  <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    Story Mode
                  </h2>
                  <p className={`mt-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    Question {currentQuestion + 1} of {storyQuestions.length}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className={`text-xl mb-6 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {storyQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {storyQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleStoryAnswer(option.mood)}
                        className={`w-full p-4 text-left rounded-lg transition-all duration-300 ${
                          isDarkMode
                            ? "bg-slate-700/50 hover:bg-slate-600/50 text-slate-200"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700"
                        }`}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Region Selection */}
              <div className="mb-8">
                <h2
                  className={`text-2xl font-semibold text-center mb-6 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                >
                  Choose Your Cinema Region
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        selectedRegion === region.id
                          ? `bg-gradient-to-br from-purple-200 to-pink-200 shadow-lg scale-105 ${
                              isDarkMode ? "shadow-purple-500/25" : "shadow-slate-300/50"
                            }`
                          : isDarkMode
                            ? "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700"
                            : "bg-white/70 hover:bg-white/90 border border-slate-200"
                      } backdrop-blur-sm`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{region.flag}</div>
                        <div
                          className={`font-medium ${
                            selectedRegion === region.id
                              ? "text-slate-800"
                              : isDarkMode
                                ? "text-slate-200"
                                : "text-slate-700"
                          }`}
                        >
                          {region.name}
                        </div>
                        <div
                          className={`text-sm ${
                            selectedRegion === region.id
                              ? "text-slate-600"
                              : isDarkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                          }`}
                        >
                          {region.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Selection */}
              <div className="mb-8">
                <h2
                  className={`text-2xl font-semibold text-center mb-8 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                >
                  How are you feeling today?
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {Object.entries(moviesByRegion[selectedRegion] || {}).map(([mood, data]) => (
                    <button
                      key={mood}
                      onClick={() => handleMoodSelect(mood)}
                      className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        selectedMood === mood
                          ? `bg-gradient-to-br ${data.color} shadow-lg scale-105 ${
                              isDarkMode ? "shadow-purple-500/25" : "shadow-slate-300/50"
                            }`
                          : isDarkMode
                            ? "bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700"
                            : "bg-white/70 hover:bg-white/90 border border-slate-200"
                      } backdrop-blur-sm`}
                    >
                      <div className="text-4xl mb-2">{data.emoji}</div>
                      <div
                        className={`font-medium capitalize ${
                          selectedMood === mood ? "text-slate-800" : isDarkMode ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        {mood}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Additional Preferences */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      <Globe className="w-4 h-4 inline mr-2" />
                      Cinema Region
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700 text-slate-200"
                          : "bg-white/70 border-slate-300 text-slate-700"
                      } backdrop-blur-sm`}
                    >
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.flag} {region.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      <Filter className="w-4 h-4 inline mr-2" />
                      Preferred Genre
                    </label>
                    <select
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700 text-slate-200"
                          : "bg-white/70 border-slate-300 text-slate-700"
                      } backdrop-blur-sm`}
                    >
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                    >
                      <Film className="w-4 h-4 inline mr-2" />
                      Favorite Movie
                    </label>
                    <input
                      type="text"
                      value={favoriteMovie}
                      onChange={(e) => setFavoriteMovie(e.target.value)}
                      placeholder="e.g., The Matrix"
                      className={`w-full p-3 rounded-lg border ${
                        isDarkMode
                          ? "bg-slate-800/50 border-slate-700 text-slate-200 placeholder-slate-400"
                          : "bg-white/70 border-slate-300 text-slate-700 placeholder-slate-500"
                      } backdrop-blur-sm`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center items-center mb-12">
                  <button
                    onClick={getRecommendations}
                    disabled={!selectedMood || isLoading}
                    className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      isDarkMode
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    } shadow-lg`}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Finding Movies...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Search className="w-5 h-5" />
                        <span>Get Recommendations</span>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={getSmartRecommendation}
                    disabled={isLoading}
                    className={`px-6 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? "bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 border border-slate-600"
                        : "bg-white/70 text-slate-700 hover:bg-white/90 border border-slate-300"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-2">
                      <Shuffle className="w-4 h-4" />
                      <span>Smart Surprise</span>
                    </div>
                  </button>

                  <button
                    onClick={startStoryMode}
                    disabled={isLoading}
                    className={`px-6 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDarkMode
                        ? "bg-indigo-600/50 text-indigo-200 hover:bg-indigo-500/50 border border-indigo-500"
                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-300"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Story Mode</span>
                    </div>
                  </button>

                  <button
                    onClick={isListening ? stopVoiceInput : startVoiceInput}
                    disabled={isLoading}
                    className={`px-6 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isListening
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : isDarkMode
                          ? "bg-green-600/50 text-green-200 hover:bg-green-500/50 border border-green-500"
                          : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-2">
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span>{isListening ? "Stop" : "Voice Input"}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Personalized Message */}
          {personalizedMessage && showResults && (
            <div className={`text-center mb-8 p-4 rounded-lg ${isDarkMode ? "bg-purple-900/30" : "bg-purple-50"}`}>
              <p className={`text-lg ${isDarkMode ? "text-purple-200" : "text-purple-800"}`}>{personalizedMessage}</p>
            </div>
          )}

          {/* Results */}
          {showResults && recommendations.length > 0 && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-center mb-8">
                <Sparkles className={`w-6 h-6 mr-2 ${isDarkMode ? "text-purple-300" : "text-purple-600"}`} />
                <h3 className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  Your Perfect Movie Matches
                </h3>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((movie, index) => (
                  <div
                    key={index}
                    className={`group rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                      isDarkMode
                        ? "bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50"
                        : "bg-white/80 border border-slate-200 hover:bg-white/95"
                    } backdrop-blur-sm`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: "slideInUp 0.6s ease-out forwards",
                    }}
                  >
                    {/* Movie Poster */}
                    <div className="relative overflow-hidden">
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button
                        onClick={() => saveRecommendation(movie)}
                        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-6">
                      {/* Title and Year */}
                      <div className="flex justify-between items-start mb-3">
                        <h4
                          className={`font-bold text-xl leading-tight ${isDarkMode ? "text-white" : "text-slate-800"}`}
                        >
                          {movie.title}
                        </h4>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            isDarkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {movie.year}
                        </span>
                      </div>

                      {/* Genre, Rating, Runtime */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            isDarkMode ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {movie.genre}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400 text-sm">{renderStars(movie.rating)}</span>
                            <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                              {movie.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Director and Runtime */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className={`${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          Dir: {movie.director}
                        </span>
                        <span className={`${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          {formatRuntime(movie.runtime)}
                        </span>
                      </div>

                      {/* Cast */}
                      <div className="mb-4">
                        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          <strong>Cast:</strong> {movie.cast.join(", ")}
                        </p>
                      </div>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                        {movie.description}
                      </p>

                      {/* Watch Trailer Button */}
                      <a
                        href={movie.trailer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          isDarkMode
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        <Play className="w-4 h-4" />
                        <span>Watch Trailer</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`mt-20 py-8 border-t ${
          isDarkMode ? "border-slate-700 bg-slate-900/50" : "border-slate-200 bg-white/50"
        } backdrop-blur-sm`}
      >
        <div className="container mx-auto px-6 text-center">
          <p className={`${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Made with ❤️ for movie lovers everywhere
          </p>
          <p className={`mt-2 text-sm ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
            Discover cinema from Hollywood, Bollywood, Korean, Chinese, Thai, and Tollywood industries
          </p>
          <p className={`mt-1 text-xs ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>
            Multi-regional recommendations • Voice input enabled • LocalStorage supported
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
