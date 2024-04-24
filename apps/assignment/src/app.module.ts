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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dits',
      password: 'password',
      database: 'hospital_management',
      entities: [Hospitals, HealthCareWorker],
      synchronize: true,
    }),
    DoctorModule,
    HospitalModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
