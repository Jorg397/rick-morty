import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { AllLocations, LocationAPI } from '../models/location_api.models'

@Injectable()
export class LocationsApiService {
  private charactersApiUrl = 'https://rickandmortyapi.com/api/location'

  async getAllLocations(): Promise<LocationAPI[]> {
    const locations = []

    const { data } = await axios<AllLocations>(this.charactersApiUrl)
    locations.push(...data.results)

    const pages = data.info.pages

    for (let i = 2; i <= pages; i++) {
      const { data } = await axios<AllLocations>(
        `${this.charactersApiUrl}?page=${i}`,
      )
      locations.push(...data.results)
    }

    return locations
  }

  async getLocationByName(name: string): Promise<Location> {
    const { data } = await axios<Location>(
      `${this.charactersApiUrl}/?${(name = name)}`,
    )
    return data
  }

  async getMultipleLocations(ids: number[]): Promise<Location[]> {
    const { data } = await axios<Location[]>(
      `${this.charactersApiUrl}/${ids.join(',')}`,
    )
    return data
  }
}
