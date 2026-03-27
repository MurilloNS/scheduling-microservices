import { AppointmentRepository } from './repositories/appointments.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { QUEUES } from '@app/common/messaging/queues';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from '@prisma/client';
import { AppointmentCreatedEvent } from '@app/common/messaging/events/appointment-created.event';
import { AppointmentUpdatedEvent } from '@app/common/messaging/events/appointment-updated.event';
import { AppointmentDeletedEvent } from '@app/common/messaging/events/appointment-deleted.event';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,

    @Inject('APPOINTMENT_CREATED_CLIENT')
    private readonly createdClient: ClientProxy,

    @Inject('APPOINTMENT_UPDATED_CLIENT')
    private readonly updatedClient: ClientProxy,

    @Inject('APPOINTMENT_DELETED_CLIENT')
    private readonly deletedClient: ClientProxy,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.findAll();
  }

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    console.log('CHEGOU NO SERVICE');
    const appointment = await this.appointmentRepository.create(data);

    const event: AppointmentCreatedEvent = {
      id: appointment.id,
      userId: appointment.userId,
      email: appointment.email,
      serviceName: appointment.serviceName,
      date: appointment.date,
      createdAt: appointment.createdAt,
    };

    this.createdClient.emit(QUEUES.APPOINTMENT_CREATED, event);

    return appointment;
  }

  async update(id: string, data: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.appointmentRepository.update(id, data);

    const event: AppointmentUpdatedEvent = {
      id: appointment.id,
      userId: appointment.userId,
      email: appointment.email,
      serviceName: appointment.serviceName,
      date: appointment.date,
      updatedAt: appointment.updatedAt,
    };

    this.updatedClient.emit(QUEUES.APPOINTMENT_UPDATED, event);

    return appointment;
  }

  async delete(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.delete(id);

    const event: AppointmentDeletedEvent = {
      id: appointment.id,
      userId: appointment.userId,
      email: appointment.email,
    };

    this.deletedClient.emit(QUEUES.APPOINTMENT_DELETED, event);
  }
}
