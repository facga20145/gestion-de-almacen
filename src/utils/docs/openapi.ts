import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

const OPENAPI_ENVS = ['local', 'development'];

export function configureOpenAPI(app: INestApplication): OpenAPIObject {
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('NODE_ENV');

  if (!nodeEnv || !OPENAPI_ENVS.includes(nodeEnv)) {
    return {} as OpenAPIObject;
  }

  // Lee las configuraciones desde el .env
  const title = configService.get<string>('API_TITLE', 'Sistema de Transporte API');
  const description = configService.get<string>(
    'API_DESCRIPTION',
    'API para gestión de paquetes y productos de Transporte Juan',
  );
  const version = configService.get<string>('API_VERSION', '1.0.0');
  const server = configService.get<string>('API_SERVER', 'http://localhost:3001');

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer(server, 'Servidor Local')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
    deepScanRoutes: true,
  });

  // Guardar el archivo OpenAPI JSON (opcional, para importación manual)
  if (nodeEnv === 'development') {
    const fs = require('fs');
    fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  }

  return document;
}

