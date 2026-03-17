import { Module } from '@nestjs/common';
import { SchedulingServiceController } from './scheduling-service.controller';
import { SchedulingServiceService } from './scheduling-service.service';

@Module({
  imports: [],
  controllers: [SchedulingServiceController],
  providers: [SchedulingServiceService],
})
export class SchedulingServiceModule {}
