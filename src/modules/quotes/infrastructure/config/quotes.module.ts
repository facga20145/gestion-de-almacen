import { Module } from '@nestjs/common';
import { QuotesController } from '../controllers/quotes.controller';
import { QuotesCreateService } from '../../domain/services/commands/quotes-create.service';
import { QuotesUpdateService } from '../../domain/services/commands/quotes-update.service';
import { QuotesDeleteService } from '../../domain/services/commands/quotes-delete.service';
import { QuotesFindOneService } from '../../domain/services/queries/quotes-find-one.service';
import { QuotesFindAllService } from '../../domain/services/queries/quotes-find-all.service';
import { QuotesCreateUseCase } from '../../application/use-cases/commands/quotes-create.use-case';
import { QuotesUpdateUseCase } from '../../application/use-cases/commands/quotes-update.use-case';
import { QuotesDeleteUseCase } from '../../application/use-cases/commands/quotes-delete.use-case';
import { QuotesFindOneUseCase } from '../../application/use-cases/queries/quotes-find-one.use-case';
import { QuotesFindAllUseCase } from '../../application/use-cases/queries/quotes-find-all.use-case';
import { QuotesRepositoryImpl } from '../adapters/implements/quotes-repository.impl';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [QuotesController],
  providers: [
    // Services
    { provide: 'QuotesCreateService', useClass: QuotesCreateService },
    { provide: 'QuotesUpdateService', useClass: QuotesUpdateService },
    { provide: 'QuotesDeleteService', useClass: QuotesDeleteService },
    { provide: 'QuotesFindOneService', useClass: QuotesFindOneService },
    { provide: 'QuotesFindAllService', useClass: QuotesFindAllService },

    // Use cases
    QuotesCreateUseCase,
    QuotesUpdateUseCase,
    QuotesDeleteUseCase,
    QuotesFindOneUseCase,
    QuotesFindAllUseCase,

    // Repository
    QuotesRepositoryImpl,
    {
      provide: 'QuotesRepositoryPort',
      useClass: QuotesRepositoryImpl,
    },
  ],
  exports: [],
})
export class QuotesModule {}