import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from './middleware.service';
import { Hospitals } from 'apps/hospital/src/hospital.entity';

@Module({
  providers: [AuthMiddleware],
  exports: [AuthMiddleware],
  imports: [TypeOrmModule.forFeature([Hospitals])],
})
export class MiddlewareModule {}
