import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { email: string; password: string; role: string }) {
    // TODO: Hash password before saving
    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.password, // Temporary - will hash later
        firstName: '', // TODO: Add to form
        lastName: '', // TODO: Add to form
      },
    });
  }
}

