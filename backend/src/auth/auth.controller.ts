import { Controller, Body, Post, Request, UseGuards } from '@nestjs/common';
import { registerSchema, type RegisterDto } from '@mathemathers/schemas';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }
}
