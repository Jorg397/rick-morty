import { Module } from '@nestjs/common'
import { CategoryModule } from './category/category.module'
import { CharacterModule } from './character/character.module'
import { EpisodeModule } from './episode/episode.module'
import { LocationModule } from './location/location.module'
import { ParticipationModule } from './participation/participation.module'
import { StatusModule } from './status/status.module'
import { StatustypeModule } from './statustype/statustype.module'
import { SubcategoryModule } from './subcategory/subcategory.module'

@Module({
  imports: [
    CategoryModule,
    SubcategoryModule,
    StatustypeModule,
    StatusModule,
    LocationModule,
    CharacterModule,
    EpisodeModule,
    ParticipationModule,
  ],
})
export class AppModule {}
