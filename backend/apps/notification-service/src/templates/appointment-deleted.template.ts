import { AppointmentDeletedEvent } from '@app/common/messaging/events/appointment-deleted.event';

export function appointmentDeletedTemplate() {
  return {
    subject: 'Agendamento cancelado',
    text: 'Seu agendamento foi cancelado.',
  };
}
