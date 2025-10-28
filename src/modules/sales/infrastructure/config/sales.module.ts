import { Module } from '@nestjs/common';
import { SalesController } from '../controllers/sales.controller';
import { SalesCreateService } from '../../domain/services/commands/sales-create.service';
import { SalesFindOneService } from '../../domain/services/queries/sales-find-one.service';
import { SalesFindAllService } from '../../domain/services/queries/sales-find-all.service';
import { SalesCreateUseCase } from '../../application/use-cases/commands/sales-create.use-case';
import { SalesFindOneUseCase } from '../../application/use-cases/queries/sales-find-one.use-case';
import { SalesFindAllUseCase } from '../../application/use-cases/queries/sales-find-all.use-case';
import { SalesRepositoryImpl } from '../adapters/implements/sales-repository.impl';

@Module({
  imports: [],
  controllers: [SalesController],
  providers: [
    // Services
    { provide: 'SalesCreateService', useClass: SalesCreateService },
    { provide: 'SalesFindOneService', useClass: SalesFindOneService },
    { provide: 'SalesFindAllService', useClass: SalesFindAllService },

    // Use cases
    SalesCreateUseCase,
    SalesFindOneUseCase,
    SalesFindAllUseCase,

    // Repository
    SalesRepositoryImpl,
    {
      provide: 'SalesRepositoryPort',
      useClass: SalesRepositoryImpl,
    },
  ],
  exports: [],
})
export class SalesModule {}