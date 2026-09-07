import { Module } from '@nestjs/common';
import { SupervisionsController } from './supervisions.controller';
import { SupervisionsService } from './supervisions.service';

@Module({
  controllers: [SupervisionsController],
  providers: [SupervisionsService],
})
export class SupervisionsModule {}
