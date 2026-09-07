import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentSupervisionStatus } from '@prisma/client';
import type { InviteSupervisionDto } from '@mathemathers/schemas';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SupervisionsService {
  constructor(private prisma: PrismaService) {}

  async invite(supervisorId: string, data: InviteSupervisionDto) {
    // TODO: Move to user service
    const supervisor = await this.prisma.user.findUnique({ where: { id: supervisorId } });
    const student = await this.prisma.user.findUnique({where: { email: data.studentEmail } });

    // Security check, as we don't have triggers yet
    if (!supervisor || supervisor.role !== 'tutor') {
      throw new ForbiddenException({ errors: ['SUPERVISOR_NOT_TUTOR'] });
    }

    if (!student || student.role !== 'student') {
      throw new NotFoundException({ errors: ['STUDENT_NOT_FOUND'] });
    }

    // TODO: Move to a private function
    const existing = await this.prisma.studentSupervision.findUnique({
      where: {
        supervisorId_studentId: {
          supervisorId,
          studentId: student.id,
        },
      },
    });

    if (existing?.status === StudentSupervisionStatus.PENDING) {
      throw new BadRequestException({ errors: ['INVITE_PENDING'] });
    }

    if (existing?.status === StudentSupervisionStatus.ACTIVE) {
      throw new BadRequestException({ errors: ['ALREADY_LINKED'] });
    }

    return this.prisma.studentSupervision.create({
      data: {
        supervisorId: supervisorId,
        studentId: student.id,
        status: StudentSupervisionStatus.PENDING,
      },
    });
  }

  async listStudents(supervisorId: string) {
    const supervisor = await this.prisma.user.findUnique({ where: { id: supervisorId } });

    if (!supervisor || supervisor.role !== 'tutor') {
      throw new ForbiddenException({ errors: ['SUPERVISOR_NOT_TUTOR'] });
    }

    const supervisions = await this.prisma.studentSupervision.findMany({
      where: {
        supervisorId: supervisorId,
      },
      include: { student: true },
    });

    return {
      pending: supervisions.filter(
        (s) => s.status === StudentSupervisionStatus.PENDING,
      ),
      active: supervisions.filter(
        (s) => s.status === StudentSupervisionStatus.ACTIVE,
      ),
    };
  }
}
