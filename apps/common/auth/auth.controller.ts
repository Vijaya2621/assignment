import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.services';

@Controller('email')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async sendEmail(@Body() body: { to: string; subject: string }) {
    const { to, subject } = body;
    try {
      await this.authService.sendEmail(to, subject);
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { error: 'Failed to send email' };
    }
  }
}
