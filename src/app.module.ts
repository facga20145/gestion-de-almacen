import { ProductsModule } from './modules/products/config/products.module';
import { SuppliersModule } from './modules/suppliers/config/suppliers.module';
import { QuotesModule } from './modules/quotes/config/quotes.module';
import { SalesModule } from './modules/sales/config/sales.module';
import { LogEmailsModule } from './modules/log-emails/config/log-emails.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/filters/exception.filter';
import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// TODO: Importar módulos del sistema de transporte cuando estén creados
// import { SedesModule } from './modules/sedes/infrastructure/config/sedes.module';
// import { PaquetesModule } from './modules/paquetes/infrastructure/config/paquetes.module';
// import { ProductosModule } from './modules/productos/infrastructure/config/productos.module';
// import { VentasModule } from './modules/ventas/infrastructure/config/ventas.module';
// import { ListasEnvioModule } from './modules/listas-envio/infrastructure/config/listas-envio.module';
// import { ReportesModule } from './modules/reportes/infrastructure/config/reportes.module';
// import { AuthModule } from './modules/auth/infrastructure/config/auth.module';

@Module({
  imports: [LogEmailsModule, SalesModule, QuotesModule, SuppliersModule, ProductsModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TODO: Agregar módulos aquí cuando estén creados
    // AuthModule,
    // SedesModule,
    // PaquetesModule,
    // ProductosModule,
    // VentasModule,
    // ListasEnvioModule,
    // ReportesModule,
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
