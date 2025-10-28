import { Module } from '@nestjs/common';
import { ProductsController } from '../controllers/products.controller';
import { ProductsCreateService } from '../../domain/services/commands/products-create.service';
import { ProductsUpdateService } from '../../domain/services/commands/products-update.service';
import { ProductsDeleteService } from '../../domain/services/commands/products-delete.service';
import { ProductsFindOneService } from '../../domain/services/queries/products-find-one.service';
import { ProductsFindAllService } from '../../domain/services/queries/products-find-all.service';
import { ProductsCreateUseCase } from '../../application/use-cases/commands/products-create.use-case';
import { ProductsUpdateUseCase } from '../../application/use-cases/commands/products-update.use-case';
import { ProductsDeleteUseCase } from '../../application/use-cases/commands/products-delete.use-case';
import { ProductsFindOneUseCase } from '../../application/use-cases/queries/products-find-one.use-case';
import { ProductsFindAllUseCase } from '../../application/use-cases/queries/products-find-all.use-case';
import { ProductsRepositoryImpl } from '../adapters/implements/products-repository.impl';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    // Services
    { provide: 'IProductsCreate', useClass: ProductsCreateService },
    { provide: 'IProductsUpdate', useClass: ProductsUpdateService },
    { provide: 'ProductsDeleteService', useClass: ProductsDeleteService },
    { provide: 'ProductsFindOneService', useClass: ProductsFindOneService },
    { provide: 'ProductsFindAllService', useClass: ProductsFindAllService },

    // Use cases
    ProductsCreateUseCase,
    ProductsUpdateUseCase,
    ProductsDeleteUseCase,
    ProductsFindOneUseCase,
    ProductsFindAllUseCase,

    // Repository
    ProductsRepositoryImpl,
    {
      provide: 'ProductsRepositoryPort',
      useClass: ProductsRepositoryImpl,
    },
  ],
  exports: [],
})
export class ProductsModule {}