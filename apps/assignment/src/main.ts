import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/v1/api');
  const configService = app.get(ConfigService);
  const port = configService.get('ASSIGNMENT_PORT');
  await app.listen(port);
}
bootstrap();
