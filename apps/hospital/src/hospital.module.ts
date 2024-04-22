import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospitals } from './hospital.entity';
import { HospitalController } from './hospital.controller';

@Module({
  imports: [
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
