import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  inviteSupervisionSchema,
  type InviteSupervisionDto,
} from '@mathemathers/schemas';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { SupervisionsService } from './supervisions.service';

@Controller('supervisions')
export class SupervisionsController {
  constructor(private readonly supervisionsService: SupervisionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('students')
  async listStudents(@Request() req) {
    return this.supervisionsService.listStudents(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invite')
  async invite(@Request() req, @Body(new ZodValidationPipe(inviteSupervisionSchema)) body: InviteSupervisionDto) {
    return this.supervisionsService.invite(req.user.userId, body);
  }
}
