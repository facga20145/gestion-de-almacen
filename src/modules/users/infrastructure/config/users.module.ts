import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersFindOneService } from '../../domain/services/queries/users-find-one.service';

import { UsersFindOneUseCase } from '../../application/use-cases/queries/users-find-one.use-case';

import { UsersRepositoryImpl } from '../adapters/implements/users-repository.impl';
import { UsersUpdateStatusService } from '../../domain/services/commands/users-update-status.service';
import { UsersUpdateStatusUseCase } from '../../application/use-cases/commands/users-update-status.use-case';
import { UsersFindPaginatedService } from '../../domain/services/queries/users-find-paginated.service';
import { UsersFindPaginatedUseCase } from '../../application/use-cases/queries/users-find-paginated.use-case';
import { AuthModule } from 'src/modules/auth/infrastructure/config/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    { provide: 'IUsersFindOne', useClass: UsersFindOneService },
    { provide: 'IUsersFindPaginated', useClass: UsersFindPaginatedService },
    { provide: 'IUsersUpdateStatus', useClass: UsersUpdateStatusService },


    //Cambiar el estado de un usuario
    UsersUpdateStatusService,
    UsersUpdateStatusUseCase,

    //Encontrar solo 1
    UsersFindOneService,
    UsersFindOneUseCase,

    // Paginación
    UsersFindPaginatedService,
    UsersFindPaginatedUseCase,

    UsersRepositoryImpl,
    {
      provide: 'UsersRepositoryPort',
      useClass: UsersRepositoryImpl,
    },
  ],
})
export class UsersModule {}
