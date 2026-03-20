import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { Appointment } from '@prisma/client';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';

@Injectable()
export class AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany();
  }

  async create(data: CreateAppointmentDto): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: {
        userId: data.userId,
        email: data.email,
        serviceName: data.serviceName,
        date: new Date(data.date),
      },
    });
  }

  async update(id: string, data: UpdateAppointmentDto): Promise<Appointment> {
    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  async delete(id: string): Promise<Appointment> {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
