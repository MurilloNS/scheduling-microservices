import { AppointmentRepository } from './repositories/appointments.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { QUEUES } from '@app/common/messaging/queues';
import { SERVICES } from '@app/common/messaging/services';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    @Inject(SERVICES.APPOINTMENT_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.findAll();
  }

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.create(data);

    this.client.emit(QUEUES.APPOINTMENT_CREATED, appointment);

    return appointment;
  }

  async update(id: string, data: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.update(id, data);

    this.client.emit(QUEUES.APPOINTMENT_UPDATED, appointment);

    return appointment;
  }

  async delete(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.delete(id);

    this.client.emit(QUEUES.APPOINTMENT_DELETED, appointment);
  }
}
