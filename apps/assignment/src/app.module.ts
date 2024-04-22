import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'apps/doctor/src/doctor.module';
import { HospitalModule } from 'apps/hospital/src/hospital.module';
import { Hospitals } from 'apps/hospital/src/hospital.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dits',
      password: 'password',
      database: 'hospital_management',
      entities: [Hospitals],
      synchronize: true,
    }),
    DoctorModule,
    HospitalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
