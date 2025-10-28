import { ProductsModule } from './modules/products/infrastructure/config/products.module';
import { SuppliersModule } from './modules/suppliers/infrastructure/config/suppliers.module';
import { QuotesModule } from './modules/quotes/infrastructure/config/quotes.module';
import { SalesModule } from './modules/sales/infrastructure/config/sales.module';
import { LogEmailsModule } from './modules/log-emails/infrastructure/config/log-emails.module';
import { AuthModule } from './modules/auth/infrastructure/config/auth.module';
import { UsersModule } from './modules/users/infrastructure/config/users.module';
import { EmailModule } from './utils/email.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/filters/exception.filter';
import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    SuppliersModule,
    QuotesModule,
    SalesModule,
    LogEmailsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    PrismaService,
    AppService,
  ],
})
export class AppModule { }
