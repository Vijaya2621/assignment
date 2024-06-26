import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(PatientModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('PATIENT_PORT');
  await app.listen(port);
}
bootstrap();
