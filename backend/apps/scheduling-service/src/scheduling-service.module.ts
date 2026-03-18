import { Module } from '@nestjs/common';
import { SchedulingServiceController } from './scheduling-service.controller';
import { SchedulingServiceService } from './scheduling-service.service';
import { AppointmentsModule } from './appointments/appointments.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AppointmentsModule, DatabaseModule],
  controllers: [SchedulingServiceController],
  providers: [SchedulingServiceService],
})
export class SchedulingServiceModule {}
