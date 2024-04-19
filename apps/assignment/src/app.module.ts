import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorModule } from 'apps/doctor/src/doctor.module';
import { HospitalModule } from 'apps/hospital/src/hospital.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dits',
      password: 'password',
      database: 'hospital_management',
      entities: [],
      synchronize: true,
    }),
    forwardRef(() => DoctorModule),
    forwardRef(() => HospitalModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
