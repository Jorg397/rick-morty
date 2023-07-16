import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { AllCharacters, CharacterAPI } from '../models/character_api.model'

@Injectable()
export class CharactersApiService {
  private charactersApiUrl = 'https://rickandmortyapi.com/api/character'

  async getAllCharacters(): Promise<AllCharacters> {
    const { data } = await axios.get<AllCharacters>(this.charactersApiUrl)
    return data
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
