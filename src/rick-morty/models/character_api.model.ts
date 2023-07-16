export interface CharacterAPI {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Location
  location: Location
  image: string
  episode: string[]
  url: string
  created: string
}

interface Location {
  name: string
  url: string
}

export interface AllCharacters {
  info: {
    count: number
    pages: number
    next: string
    prev: string | null
  }
  results: CharacterAPI[]
}
