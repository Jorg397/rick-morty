import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { AllLocations } from '../models/location_api.models'

@Injectable()
export class LocationsApiService {
  private charactersApiUrl = 'https://rickandmortyapi.com/api/location'

  async getAllLocations(): Promise<AllLocations> {
    const { data } = await axios<AllLocations>(this.charactersApiUrl)
    return data
  }

  async getLocationById(id: number): Promise<Location> {
    const { data } = await axios<Location>(`${this.charactersApiUrl}/${id}`)
    return data
  }

  async getMultipleLocations(ids: number[]): Promise<Location[]> {
    const { data } = await axios<Location[]>(
      `${this.charactersApiUrl}/${ids.join(',')}`,
    )
    return data
  }
}
