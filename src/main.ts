import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDoc = new DocumentBuilder()
    .setTitle('Ecommerce - BACKEND')
    .setDescription('Esta es una API construida para el proyecto del modulo 4 de Henry')
    .addBearerAuth()
    .build();
  const swaggerModule = SwaggerModule.createDocument(app, swaggerDoc);
  SwaggerModule.setup('docs', app, swaggerModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error during application startup', err);
});
