import { AppointmentCreatedEvent } from '@app/common/messaging/events/appointment-created.event';
import { AppointmentDeletedEvent } from '@app/common/messaging/events/appointment-deleted.event';
import { AppointmentUpdatedEvent } from '@app/common/messaging/events/appointment-updated.event';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { appointmentCreatedTemplate } from './templates/appointment-created.template';
import { appointmentUpdatedTemplate } from './templates/appointment-updated.template';
import { appointmentDeletedTemplate } from './templates/appointment-deleted.template';

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
    const { subject, text } = appointmentCreatedTemplate(data);
    await this.sendEmail(data.email, subject, text);
  }

  async handleAppointmentUpdated(data: AppointmentUpdatedEvent) {
    const { subject, text } = appointmentUpdatedTemplate(data);
    await this.sendEmail(data.email, subject, text);
  }

  async handleAppointmentDeleted(data: AppointmentDeletedEvent) {
    const { subject, text } = appointmentDeletedTemplate();
    await this.sendEmail(data.email, subject, text);
  }
}
