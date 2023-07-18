export interface IGetAllResponse<T> {
  results: T[]
  info: {
    count: number
    pages: number
    current_page: number
  }
}
