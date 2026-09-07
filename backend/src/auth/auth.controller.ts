import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  registerSchema,
  updateProfileSchema,
  type RegisterDto,
  type UpdateProfileDto,
} from '@mathemathers/schemas';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    const user = await this.usersService.findProfile(req.user.userId);

    if (!user) {
      throw new NotFoundException({ errors: ['USER_NOT_FOUND'] });
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Request() req,
    @Body(new ZodValidationPipe(updateProfileSchema)) body: UpdateProfileDto,
  ) {
    const user = await this.usersService.updateProfile(req.user.userId, body);

    if (!user) {
      throw new NotFoundException({ errors: ['USER_NOT_FOUND'] });
    }

    return user;
  }
}
