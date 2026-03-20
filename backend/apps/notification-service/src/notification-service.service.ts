import { AppointmentCreatedEvent } from '@app/common/messaging/events/appointment-created.event';
import { AppointmentDeletedEvent } from '@app/common/messaging/events/appointment-deleted.event';
import { AppointmentUpdatedEvent } from '@app/common/messaging/events/appointment-updated.event';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationServiceService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendEmail(to: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
  }

  async handleAppointmentCreated(data: AppointmentCreatedEvent) {
    console.log('📩 [Notification] Appointment CREATED:', data);

    await this.sendEmail(
      data.email,
      'Agendamento criado',
      `Seu agendamento para ${data.serviceName} foi criado na data ${data.date}`,
    );
  }

  async handleAppointmentUpdated(data: AppointmentUpdatedEvent) {
    console.log('📩 [Notification] Appointment UPDATED:', data);

    await this.sendEmail(
      data.email,
      'Agendamento atualizado',
      `Seu agendamento foi atualizado para ${data.date}`,
    );
  }

  async handleAppointmentDeleted(data: AppointmentDeletedEvent) {
    console.log('📩 [Notification] Appointment DELETED:', data);

    await this.sendEmail(
      data.email,
      'Agendamento cancelado',
      `Seu agendamento foi cancelado.`,
    );
  }
}
