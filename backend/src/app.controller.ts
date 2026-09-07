import {
  Controller,
  Get,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  async profileInfo(@Request() req) {
    const user = await this.usersService.findProfile(req.user.userId);

    if (!user) {
      throw new NotFoundException({ errors: ['USER_NOT_FOUND'] });
    }

    return user;
  }
}
