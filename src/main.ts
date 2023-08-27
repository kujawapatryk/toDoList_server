import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configCors } from './config/config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [configCors]
  });
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  app.useGlobalFilters(new GlobalExceptionFilter)
  await app.listen(3000);
  console.log('http://127.0.0.1:3000/');

}
bootstrap();
