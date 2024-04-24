import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './auth.services';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() body: { to: string; subject: string }) {
    const { to, subject } = body;
    try {
      await this.emailService.sendEmail(to, subject);
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { error: 'Failed to send email' };
    }
  }
}
