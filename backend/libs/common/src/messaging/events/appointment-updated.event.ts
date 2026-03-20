export class AppointmentUpdatedEvent {
  id: string;
  userId: string;
  email: string;
  serviceName: string;
  date: Date;
  updatedAt: Date;
}
