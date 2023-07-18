import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { AllEpisodes, EpisodeAPI } from '../models/episode_api.models'

@Injectable()
export class EpisodesApiService {
  private charactersApiUrl = 'https://rickandmortyapi.com/api/episode'

  async getAllEpisodes(): Promise<EpisodeAPI[]> {
    const episodes = []

    const { data } = await axios.get<AllEpisodes>(this.charactersApiUrl)
    episodes.push(...data.results)

    const pages = data.info.pages

    for (let i = 2; i <= pages; i++) {
      const { data } = await axios.get<AllEpisodes>(
        `${this.charactersApiUrl}?page=${i}`,
      )
      episodes.push(...data.results)
    }

    return episodes
  }

  async getEpisodeById(id: number): Promise<EpisodeAPI> {
    const { data } = await axios.get<EpisodeAPI>(
      `${this.charactersApiUrl}/${id}`,
    )
    return data
  }

  async getMultipleEpisodes(ids: number[]): Promise<EpisodeAPI[]> {
    const { data } = await axios.get<EpisodeAPI[]>(
      `${this.charactersApiUrl}/${ids.join(',')}`,
    )
    return data
  }
}
