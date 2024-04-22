import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals } from './hospital.entity';
import { HospitalController } from './hospital.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Hospitals]),
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
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
  exports: [HospitalService],
})
export class HospitalModule {}
