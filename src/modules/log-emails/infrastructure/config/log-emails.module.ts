import { Module } from '@nestjs/common';
import { LogEmailsController } from '../controllers/log-emails.controller';
import { LogEmailsCreateService } from '../../domain/services/commands/log-emails-create.service';
import { LogEmailsFindOneService } from '../../domain/services/queries/log-emails-find-one.service';
import { LogEmailsFindAllService } from '../../domain/services/queries/log-emails-find-all.service';
import { LogEmailsCreateUseCase } from '../../application/use-cases/commands/log-emails-create.use-case';
import { LogEmailsFindOneUseCase } from '../../application/use-cases/queries/log-emails-find-one.use-case';
import { LogEmailsFindAllUseCase } from '../../application/use-cases/queries/log-emails-find-all.use-case';
import { LogEmailsRepositoryImpl } from '../adapters/implements/log-emails-repository.impl';

@Module({
  imports: [],
  controllers: [LogEmailsController],
  providers: [
    // Services
    { provide: 'LogEmailsCreateService', useClass: LogEmailsCreateService },
    { provide: 'LogEmailsFindOneService', useClass: LogEmailsFindOneService },
    { provide: 'LogEmailsFindAllService', useClass: LogEmailsFindAllService },

    // Use cases
    LogEmailsCreateUseCase,
    LogEmailsFindOneUseCase,
    LogEmailsFindAllUseCase,

    // Repository
    LogEmailsRepositoryImpl,
    {
      provide: 'LogEmailsRepositoryPort',
      useClass: LogEmailsRepositoryImpl,
    },
  ],
  exports: [LogEmailsCreateUseCase], // Exportamos para que otros módulos puedan usarlo
})
export class LogEmailsModule {}