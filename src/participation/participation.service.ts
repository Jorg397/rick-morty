import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Participation } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'

import { IGetAllResponse } from 'src/models/get_all_response.interface'
import { checkIfParticipationTimesOverlap } from '../utilities/check_if_participation_times_overlap'
import { CreateParticipationDto } from './dto/create-participation.dto'
import { GetQuerysDto } from './dto/get_query.dto'
import { UpdateParticipationDto } from './dto/update-participation.dto'

@Injectable()
export class ParticipationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createParticipationDto: CreateParticipationDto,
  ): Promise<Participation> {
    const findEpisodeParticipations = await this.prisma.participation.findMany({
      where: {
        episodeId: createParticipationDto.episode,
        characterId: createParticipationDto.character,
      },
    })

    if (findEpisodeParticipations.length > 0) {
      for (const participation of findEpisodeParticipations) {
        if (
          participation.start === createParticipationDto.start &&
          participation.end === createParticipationDto.end
        ) {
          throw new NotFoundException('Participation already exists')
        }
      }
    }

    return await this.prisma.participation.create({
      data: {
        characterId: createParticipationDto.character,
        episodeId: createParticipationDto.episode,
        start: createParticipationDto.start,
        end: createParticipationDto.end,
      },

      include: {
        character: true,
        episode: true,
      },
    })
  }

  async findAll(query: GetQuerysDto): Promise<IGetAllResponse<Participation>> {
    const { char_status, episode_status, page, season } = query

    const skip = Number(page) || 1 * 5
    const take = 5

    const participationsLength = await this.prisma.participation.count({
      where: {
        character: {
          statusId: char_status,
        },
        episode: {
          statusId: episode_status,
          seasonId: season,
        },
      },
    })

    const participations = await this.prisma.participation.findMany({
      include: {
        character: true,
        episode: true,
      },
      where: {
        character: {
          statusId: char_status,
        },
        episode: {
          statusId: episode_status,
          seasonId: season,
        },
      },
      skip,
      take,
    })

    return {
      info: {
        count: participationsLength,
        pages: Math.ceil(participationsLength / take),
        current_page: Number(page) || 1,
      },
      results: participations,
    }
  }

  async findOne(id: string): Promise<Participation> {
    const participation = await this.prisma.participation.findUnique({
      where: {
        id: id,
      },
      include: {
        character: true,
        episode: true,
      },
    })

    if (!participation) {
      throw new NotFoundException('Participation does not exist')
    }

    return participation
  }

  async update(id: string, updateParticipationDto: UpdateParticipationDto) {
    const findEpisodeParticipation = await this.prisma.participation.findMany({
      where: {
        episodeId: updateParticipationDto.episode,
      },
    })

    if (findEpisodeParticipation) {
      const otherParticipation = findEpisodeParticipation.filter(
        (participation) => participation.id !== id,
      )

      const isOverlap = checkIfParticipationTimesOverlap(
        updateParticipationDto.start,
        updateParticipationDto.end,
        otherParticipation,
      )

      if (isOverlap) {
        throw new ConflictException('Times overlap with another participation')
      }
    }

    await this.findOne(id)

    return await this.prisma.participation.update({
      where: {
        id: id,
      },
      data: {
        characterId: updateParticipationDto.character,
        episodeId: updateParticipationDto.episode,
        start: updateParticipationDto.start,
        end: updateParticipationDto.end,
      },
    })
  }

  async remove(id: string): Promise<Participation> {
    return await this.prisma.participation.delete({
      where: {
        id: id,
      },
    })
  }

  async removeCharacterParticipationsOnEpisode(
    episodeId: string,
    characterId: string,
  ): Promise<{ message: string }> {
    console.log(episodeId, characterId)
    const deleted = await this.prisma.participation.deleteMany({
      where: {
        episodeId,
        characterId,
      },
    })

    return {
      message: `Deleted ${deleted.count} participations for character ${characterId} on episode ${episodeId}`,
    }
  }
}
