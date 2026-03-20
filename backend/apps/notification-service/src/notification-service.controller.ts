import { Controller } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { QUEUES } from '@app/common/messaging/queues';
import { AppointmentCreatedEvent } from '@app/common/messaging/events/appointment-created.event';
import { AppointmentUpdatedEvent } from '@app/common/messaging/events/appointment-updated.event';
import { AppointmentDeletedEvent } from '@app/common/messaging/events/appointment-deleted.event';

@Controller()
export class NotificationServiceController {
  constructor(
    private readonly notificationServiceService: NotificationServiceService,
  ) {}

  @EventPattern(QUEUES.APPOINTMENT_CREATED)
  handleAppointmentCreated(@Payload() data: AppointmentCreatedEvent) {
    return this.notificationServiceService.handleAppointmentCreated(data);
  }

  @EventPattern(QUEUES.APPOINTMENT_UPDATED)
  handleAppointmentUpdated(@Payload() data: AppointmentUpdatedEvent) {
    return this.notificationServiceService.handleAppointmentUpdated(data);
  }

  @EventPattern(QUEUES.APPOINTMENT_DELETED)
  handleAppointmentDeleted(@Payload() data: AppointmentDeletedEvent) {
    return this.notificationServiceService.handleAppointmentDeleted(data);
  }
}
