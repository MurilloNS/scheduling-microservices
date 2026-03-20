import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentRepository } from './repositories/appointments.repository';
import { DatabaseModule } from '../../../../libs/database/src/database.module';
import { SERVICES } from '@app/common/messaging/services';
import { QUEUES } from '@app/common/messaging/queues';
import { MessagingModule } from '@app/common/messaging/messaging.module';

@Module({
  imports: [
    DatabaseModule,
    MessagingModule.register([
      {
        name: SERVICES.APPOINTMENT_CREATED_CLIENT,
        queue: QUEUES.APPOINTMENT_CREATED,
      },
      {
        name: SERVICES.APPOINTMENT_UPDATED_CLIENT,
        queue: QUEUES.APPOINTMENT_UPDATED,
      },
      {
        name: SERVICES.APPOINTMENT_DELETED_CLIENT,
        queue: QUEUES.APPOINTMENT_DELETED,
      },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}
