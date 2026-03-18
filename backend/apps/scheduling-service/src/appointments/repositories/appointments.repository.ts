import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@Injectable()
export class AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        userId: data.userId,
        serviceName: data.serviceName,
        date: new Date(data.date),
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany();
  }
}
