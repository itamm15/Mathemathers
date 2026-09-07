import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import type { RegisterDto } from '@mathemathers/schemas';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findProfile(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
  }

  async create(data: RegisterDto) {
    // TODO: Hash password before saving
    return this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash: data.password, // Temporary - will hash later
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      },
    });
  }
}
