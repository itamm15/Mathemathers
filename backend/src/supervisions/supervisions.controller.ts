import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
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
  @Get('tutors')
  async listTutors(@Request() req) {
    return this.supervisionsService.listTutors(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('invite')
  async invite(@Request() req, @Body(new ZodValidationPipe(inviteSupervisionSchema)) body: InviteSupervisionDto) {
    return this.supervisionsService.invite(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/accept')
  async accept(@Request() req, @Param('id') id: string) {
    return this.supervisionsService.accept(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/decline')
  async decline(@Request() req, @Param('id') id: string) {
    return this.supervisionsService.decline(req.user.userId, id);
  }
}
