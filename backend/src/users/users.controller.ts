import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: { email: string; password: string; role: string }) {
    console.log('createUserDto:', createUserDto);
    return this.usersService.create(createUserDto);
  }
}

