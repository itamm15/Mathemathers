import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: { email: string; password: string; role: string }) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error: any) {
      // TODO: Handle specific errors - maybe external lib?
      throw new BadRequestException(error.message);
    }
  }
}

