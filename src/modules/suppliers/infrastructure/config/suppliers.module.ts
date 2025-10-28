import { Module } from '@nestjs/common';
import { SuppliersController } from '../controllers/suppliers.controller';
import { SuppliersCreateService } from '../../domain/services/commands/suppliers-create.service';
import { SuppliersUpdateService } from '../../domain/services/commands/suppliers-update.service';
import { SuppliersDeleteService } from '../../domain/services/commands/suppliers-delete.service';
import { SuppliersFindOneService } from '../../domain/services/queries/suppliers-find-one.service';
import { SuppliersFindAllService } from '../../domain/services/queries/suppliers-find-all.service';
import { SuppliersCreateUseCase } from '../../application/use-cases/commands/suppliers-create.use-case';
import { SuppliersUpdateUseCase } from '../../application/use-cases/commands/suppliers-update.use-case';
import { SuppliersDeleteUseCase } from '../../application/use-cases/commands/suppliers-delete.use-case';
import { SuppliersFindOneUseCase } from '../../application/use-cases/queries/suppliers-find-one.use-case';
import { SuppliersFindAllUseCase } from '../../application/use-cases/queries/suppliers-find-all.use-case';
import { SuppliersRepositoryImpl } from '../adapters/implements/suppliers-repository.impl';

@Module({
  imports: [],
  controllers: [SuppliersController],
  providers: [
    // Services
    { provide: 'ISuppliersCreate', useClass: SuppliersCreateService },
    { provide: 'ISuppliersUpdate', useClass: SuppliersUpdateService },
    { provide: 'SuppliersDeleteService', useClass: SuppliersDeleteService },
    { provide: 'SuppliersFindOneService', useClass: SuppliersFindOneService },
    { provide: 'SuppliersFindAllService', useClass: SuppliersFindAllService },

    // Use cases
    SuppliersCreateUseCase,
    SuppliersUpdateUseCase,
    SuppliersDeleteUseCase,
    SuppliersFindOneUseCase,
    SuppliersFindAllUseCase,

    // Repository
    SuppliersRepositoryImpl,
    {
      provide: 'SuppliersRepositoryPort',
      useClass: SuppliersRepositoryImpl,
    },
  ],
  exports: [],
})
export class SuppliersModule {}