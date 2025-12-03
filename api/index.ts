import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureOpenAPI } from '../src/utils/docs/openapi';
import { AllExceptionsFilter } from '../src/utils/filters/exception.filter';
import { apiReference } from '@scalar/express-api-reference';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedApp: any;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const openAPIDoc = configureOpenAPI(app);
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

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

export default async function handler(req: any, res: any) {
  const app = await createApp();
  return app(req, res);
}

