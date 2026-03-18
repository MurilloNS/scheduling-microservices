import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: {
        userId: data.userId,
        serviceName: data.serviceName,
        date: new Date(data.date),
      },
    });
  }

  async findAll(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany();
  }
}
