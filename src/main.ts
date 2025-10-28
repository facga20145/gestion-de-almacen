import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { configureOpenAPI } from './utils/docs/openapi';
import { AllExceptionsFilter } from './utils/filters/exception.filter';
import { apiReference } from '@scalar/express-api-reference';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // Logging interceptor para todas las peticiones
  app.use((req: any, res: any, next: any) => {
    logger.log(` ${req.method} ${req.originalUrl}`);
    if (req.body && Object.keys(req.body).length > 0) {
      logger.log(` Body: ${JSON.stringify(req.body)}`);
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Genera el documento OpenAPI
  const openAPIDoc = configureOpenAPI(app);

  // Configura Scalar como única documentación
  const scalarPath = configService.get<string>('SCALAR_ROUTE', '/docs') || '/docs';
  app.use(
    scalarPath,
    apiReference({
      theme: 'saturn',
      spec: {
        content: openAPIDoc,
      },
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      requestSnippets: {
        enabled: true,
      },
    }),
  );

  const port = configService.get<number>('PORT', 3001);
  
  logger.log('🚀 Server iniciado en puerto ' + port);
  logger.log(`✨ Scalar Docs disponible en: http://localhost:${port}${scalarPath}`);
  
  await app.listen(port);
  logger.log(`✅ Sistema de Transporte API corriendo en http://localhost:${port}`);
}
bootstrap();
