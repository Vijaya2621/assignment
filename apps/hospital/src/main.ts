import { NestFactory } from '@nestjs/core';
import { HospitalModule } from './hospital.module';

async function bootstrap() {
  const app = await NestFactory.create(HospitalModule);
  await app.listen(3000);
}
bootstrap();
