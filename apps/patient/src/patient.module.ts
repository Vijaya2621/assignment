import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([Patient]),
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
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
