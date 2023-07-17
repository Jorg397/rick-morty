import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { AllCharacters, CharacterAPI } from '../models/character_api.model'

@Injectable()
export class CharactersApiService {
  private charactersApiUrl = 'https://rickandmortyapi.com/api/character'

  async getAllCharacters(): Promise<CharacterAPI[]> {
    const characters = []

    const { data } = await axios.get<AllCharacters>(this.charactersApiUrl)
    characters.push(...data.results)

    const pages = data.info.pages

    for (let i = 2; i <= pages; i++) {
      const { data } = await axios.get<AllCharacters>(
        `${this.charactersApiUrl}?page=${i}`,
      )
      characters.push(...data.results)
    }

    return characters
  }

  async getCharacterById(id: number): Promise<CharacterAPI> {
    const { data } = await axios<CharacterAPI>(`${this.charactersApiUrl}/${id}`)
    return data
  }

  async getMultipleCharacters(ids: number[]): Promise<CharacterAPI[]> {
    const { data } = await axios.get<CharacterAPI[]>(
      `${this.charactersApiUrl}/${ids.join(',')}`,
    )
    return data
  }
}
