import { NestFactory } from '@nestjs/core';
import { DoctorModule } from './doctor.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DoctorModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('DOCTOR_PORT');
  await app.listen(port);
}
bootstrap();
