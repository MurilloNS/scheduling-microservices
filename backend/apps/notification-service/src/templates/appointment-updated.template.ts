import { AppointmentUpdatedEvent } from '@app/common/messaging/events/appointment-updated.event';

export function appointmentUpdatedTemplate(data: AppointmentUpdatedEvent) {
  const formattedDate = new Date(data.date).toLocaleString('pt-BR');

  return {
    subject: 'Agendamento atualizado',
    text: `Seu agendamento foi atualizado para ${formattedDate}`,
  };
}
