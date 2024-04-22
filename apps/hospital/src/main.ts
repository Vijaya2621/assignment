import { NestFactory } from '@nestjs/core';
import { HospitalModule } from './hospital.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(HospitalModule);
  const configService = app.get(ConfigService);
  const port = configService.get('HOSPITAL_PORT');
  await app.listen(port);
}
bootstrap();
