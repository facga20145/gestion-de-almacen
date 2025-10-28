import { Module } from '@nestjs/common';
import { RolesController } from '../controllers/roles.controller';
import { RolesCreateService } from '../../domain/services/commands/roles-create.service';
import { RolesRepositoryImpl } from '../adapters/implements/roles-repository.impl';
import { RolesCreateUseCase } from '../../application/use-cases/commands/roles-create.use-case';

@Module({
  imports: [],
  controllers: [RolesController],
  providers: [
    {
      provide: 'ICreateRole',
      useClass: RolesCreateService,
    },

    // Use cases

    RolesCreateUseCase,

    // repositories binding
    
    RolesRepositoryImpl,
    {
      provide: 'RolesRepositoryPort',
      useClass: RolesRepositoryImpl,
    },
  ],
})
export class RolesModule {}
