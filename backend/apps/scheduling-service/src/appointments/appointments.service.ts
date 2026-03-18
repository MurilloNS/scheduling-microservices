import { AppointmentRepository } from './repositories/appointments.repository';
import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async findAll() {
    return this.appointmentRepository.findAll();
  }

  async create(data: CreateAppointmentDto) {
    return this.appointmentRepository.create(data);
  }
}
