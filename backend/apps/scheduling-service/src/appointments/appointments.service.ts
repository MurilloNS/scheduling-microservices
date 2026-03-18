import { AppointmentRepository } from './repositories/appointments.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { QUEUES } from '@app/common/messaging/queues';
import { SERVICES } from '@app/common/messaging/services';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    @Inject(SERVICES.APPOINTMENT_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  async findAll() {
    return this.appointmentRepository.findAll();
  }

  async create(data: CreateAppointmentDto) {
    const appointment = await this.appointmentRepository.create(data);

    this.client.emit(QUEUES.APPOINTMENT_CREATED, appointment);

    return appointment;
  }
}
