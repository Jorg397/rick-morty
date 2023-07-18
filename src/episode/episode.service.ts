import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Episode } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

import { IGetAllResponse } from 'src/models/get_all_response.interface'
import { CreateEpisodeDto } from './dto/create-episode.dto'
import { QueryDto } from './dto/get_query_dto'
import { UpdateEpisodeDto } from './dto/update-episode.dto'

@Injectable()
export class EpisodeService {
  private includes = {
    season: true,
    participations: true,
  }

  constructor(private readonly prisma: PrismaService) {}

  async create(createEpisodeDto: CreateEpisodeDto) {
    //no pueden repetirse los nombres en una misma temporada

    const existingEpisode = await this.prisma.episode.findUnique({
      where: {
        name: createEpisodeDto.name,
      },
      include: this.includes,
    })

    if (existingEpisode.seasonId === createEpisodeDto.season) {
      throw new ConflictException(
        `Season ${existingEpisode.season.subcategory} already has an episode with the name ${createEpisodeDto.name}`,
      )
    }

    return await this.prisma.episode.create({
      data: {
        name: createEpisodeDto.name,
        airDate: createEpisodeDto.airDate,
        episode: createEpisodeDto.episode,
        season: {
          connect: {
            id: createEpisodeDto.season,
          },
        },
        duration: createEpisodeDto.duration,
        status: {
          connect: {
            id: createEpisodeDto.status,
          },
        },
      },
      include: this.includes,
    })
  }

  async findAll(query: QueryDto): Promise<IGetAllResponse<Episode>> {
    const { page, season_id } = query

    const skip = Number(page) || 1 * 5
    const take = 5

    const episodesLength = await this.prisma.episode.count({
      where: {
        seasonId: season_id,
      },
    })

    const episodes = await this.prisma.episode.findMany({
      include: this.includes,
      where: {
        seasonId: season_id,
      },
      skip,
      take,
    })

    return {
      info: {
        count: episodesLength,
        pages: Math.ceil(episodesLength / take),
        current_page: Number(page) || 1,
      },
      results: episodes,
    }
  }

  async findOne(id: string) {
    const episode = await this.prisma.episode.findUnique({
      where: {
        id: id,
      },
      include: this.includes,
    })

    if (!episode) {
      throw new NotFoundException('Episode does not exist')
    }

    return episode
  }

  async update(
    id: string,
    updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<Episode> {
    await this.findOne(id)

    return await this.prisma.episode.update({
      where: {
        id: id,
      },
      data: {
        name: updateEpisodeDto.name,
        airDate: updateEpisodeDto.airDate,
        episode: updateEpisodeDto.episode,
        seasonId: updateEpisodeDto.season,
        duration: updateEpisodeDto.duration,
        statusId: updateEpisodeDto.status,
      },
      include: this.includes,
    })
  }

  async remove(id: string): Promise<Episode> {
    const cancelledStatus = await this.prisma.status.findUnique({
      where: {
        status: 'cancelled',
      },
    })

    await this.findOne(id)

    return await this.prisma.episode.update({
      where: {
        id: id,
      },
      data: {
        statusId: cancelledStatus.id,
      },
      include: this.includes,
    })
  }
}
