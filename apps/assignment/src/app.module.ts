import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'apps/doctor/src/doctor.module';
import { HospitalModule } from 'apps/hospital/src/hospital.module';
import { Hospitals } from 'apps/hospital/src/hospital.entity';
import { ConfigModule } from '@nestjs/config';
import { HealthCareWorker } from 'apps/doctor/src/doctor.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EmailModule } from 'apps/common/auth/auth.module';
import { Patient } from 'apps/patient/src/patient.entity';
import { PatientModule } from 'apps/patient/src/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [Hospitals, HealthCareWorker, Patient],
      synchronize: true,
    }),
    DoctorModule,
    HospitalModule,
    EmailModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
