import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './auth.controller';
import { EmailService } from './auth.services';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
