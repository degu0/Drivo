import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<Env, true>>(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', { infer: true }),
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Drivo API')
    .setDescription('API do Drivo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT', { infer: true });

  await app.listen(port);
}
bootstrap();
