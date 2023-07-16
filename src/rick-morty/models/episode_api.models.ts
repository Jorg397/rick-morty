export interface EpisodeAPI {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface AllEpisodes {
  info: {
    count: number
    pages: number
    next: string
    prev: string | null
  }
  results: EpisodeAPI[]
}
