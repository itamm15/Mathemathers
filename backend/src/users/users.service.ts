import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  construcor(private prisma: PrismaService) {}
}