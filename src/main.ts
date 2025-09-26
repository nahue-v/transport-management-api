import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger config
  const config = new DocumentBuilder()
    .setTitle('Transport Management API')
    .setDescription('Domentation for Transport Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //save openapi.json
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
