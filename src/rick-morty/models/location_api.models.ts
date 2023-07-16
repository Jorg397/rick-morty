export interface LocationAPI {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface AllLocations {
  info: {
    count: number
    pages: number
    next: string
    prev: string | null
  }
  results: LocationAPI[]
}
