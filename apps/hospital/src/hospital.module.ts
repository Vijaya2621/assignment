import { Module, forwardRef } from '@nestjs/common';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { Hospital } from './hospital.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'apps/doctor/src/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital]), forwardRef(() => Doctor)],
  controllers: [HospitalController],
  providers: [HospitalService],
  exports: [HospitalService],
})
export class HospitalModule {}
