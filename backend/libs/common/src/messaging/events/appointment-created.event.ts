export class AppointmentCreatedEvent {
  id: string;
  userId: string;
  email: string;
  serviceName: string;
  date: Date;
  createdAt: Date;
}
