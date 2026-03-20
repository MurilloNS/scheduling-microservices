import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentRepository } from './repositories/appointments.repository';
import { DatabaseModule } from '../../../../libs/database/src/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@app/common/messaging/services';
import { QUEUES } from '@app/common/messaging/queues';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: SERVICES.APPOINTMENT_CREATED_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: QUEUES.APPOINTMENT_CREATED,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: SERVICES.APPOINTMENT_UPDATED_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: QUEUES.APPOINTMENT_UPDATED,
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: SERVICES.APPOINTMENT_DELETED_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: QUEUES.APPOINTMENT_DELETED,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}
