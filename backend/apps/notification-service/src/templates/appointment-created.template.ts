import { AppointmentCreatedEvent } from '@app/common/messaging/events/appointment-created.event';

export function appointmentCreatedTemplate(data: AppointmentCreatedEvent) {
  const formattedDate = new Date(data.date).toLocaleString('pt-BR');

  return {
    subject: 'Agendamento criado',
    text: `Seu agendamento para ${data.serviceName} foi criado na data ${formattedDate}`,
  };
}
