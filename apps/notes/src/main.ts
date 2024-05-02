import { NestFactory } from '@nestjs/core';
import { NotesModule } from './notes.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotesModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('NOTES_PORT');
  await app.listen(port);
}
bootstrap();
