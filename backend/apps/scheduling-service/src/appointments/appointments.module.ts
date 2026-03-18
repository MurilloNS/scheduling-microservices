import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { AppointmentRepository } from './repositories/appointments.repository';
import { DatabaseModule } from '../../../../libs/database/src/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@app/common/messaging/services';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: SERVICES.APPOINTMENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'appointments_queue',
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
