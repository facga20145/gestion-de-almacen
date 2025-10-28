import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

export function configureOpenAPI(app: INestApplication): OpenAPIObject {
  const configService = app.get(ConfigService);

  // Lee las configuraciones desde el .env
  const title = configService.get<string>('API_TITLE', 'Sistema de Almacén API');
  const description = configService.get<string>(
    'API_DESCRIPTION',
    'API para gestión de almacén - Productos, Cotizaciones, Ventas y Proveedores',
  );
  const version = configService.get<string>('API_VERSION', '1.0.0');
  const port = configService.get<number>('PORT', 4001);
  const server = `http://localhost:${port}`;

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
  try {
    const fs = require('fs');
    fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
    console.log('✅ OpenAPI document saved to openapi.json');
  } catch (error) {
    console.warn('⚠️ Could not save openapi.json:', error);
  }

  return document;
}

