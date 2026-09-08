import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import type { RegisterDto, UpdateProfileDto } from '@mathemathers/schemas';

const profileSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findProfile(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: profileSelect,
    });
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        select: profileSelect,
      });
    } catch {
      return null;
    }
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
