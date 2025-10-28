import { Module } from '@nestjs/common';
import { ProfilesController } from '../controllers/profiles.controller';
import { ProfilesCreateService } from '../../domain/services/commands/profiles-create.service';
import { ProfilesCreateUseCase } from '../../application/use-cases/commands/profiles-create.use-case';
import { ProfilesRepositoryImpl } from '../adapters/implements/profiles-repository.impl';
import { ProfilesFindPaginatedUseCase } from '../../application/use-cases/queries/profiles-find-paginated.use-case';
import { ProfilesFindAllUseCase } from '../../application/use-cases/queries/profiles-find-all.use-case';
import { ProfilesFindOneUseCase } from '../../application/use-cases/queries/profiles-find-one.use-case';
import { ProfilesFindPaginatedService } from '../../domain/services/queries/profiles-find-paginated.service';
import { ProfilesFindAllService } from '../../domain/services/queries/profiles-find-all.service';
import { ProfilesFindOneService } from '../../domain/services/queries/profiles-find-one.service';
import { ProfilesUpdateService } from '../../domain/services/commands/profiles-update.service';
import { ProfilesUpdateUseCase } from '../../application/use-cases/commands/profiles-update.use-case';
import { ProfilesUpdateStatusService } from '../../domain/services/commands/profiles-update-status.service';
import { ProfilesUpdateStatusUseCase } from '../../application/use-cases/commands/profiles-update-status.use-case';
import { ProfilesDeleteService } from '../../domain/services/commands/profiles-delete.service';
import { ProfilesDeleteUseCase } from '../../application/use-cases/commands/profiles-delete.use-case';

@Module({
  imports: [],
  controllers: [ProfilesController],
  providers: [
    {
      provide: 'ICreateProfile',
      useClass: ProfilesCreateService,
    },
    {
      provide: 'IProfilesFindOne',
      useClass: ProfilesFindOneService,
    },
    {
      provide: 'IProfilesFindPaginated',
      useClass: ProfilesFindPaginatedService,
    },
    {
      provide: 'IProfilesFindAll',
      useClass: ProfilesFindAllService,
    },
    {
      provide: 'IProfilesUpdate',
      useClass: ProfilesUpdateService,
    },
    {
      provide: 'IProfilesUpdateStatus',
      useClass: ProfilesUpdateStatusService,
    },
    {
      provide: 'IProfilesDelete',
      useClass: ProfilesDeleteService,
    },

    //Use cases
    ProfilesCreateUseCase,
    ProfilesUpdateUseCase,
    ProfilesUpdateStatusUseCase,
    ProfilesDeleteUseCase,
    ProfilesFindAllUseCase,
    ProfilesFindOneUseCase,
    ProfilesFindPaginatedUseCase,

    //repositories binding
    ProfilesRepositoryImpl,
    {
      provide: 'ProfilesRepository',
      useClass: ProfilesRepositoryImpl,
    },
  ],
})
export class ProfilesModule {}