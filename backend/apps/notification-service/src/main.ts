import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';
import { Transport } from '@nestjs/microservices';
import { QUEUES } from '@app/common/messaging/queues';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);

  const queues = [
    QUEUES.APPOINTMENT_CREATED,
    QUEUES.APPOINTMENT_UPDATED,
    QUEUES.APPOINTMENT_DELETED,
  ];

  queues.forEach((queue) => {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: queue,
        queueOptions: { durable: true },
      },
    });
  });

  await app.startAllMicroservices();
  await app.init();
}
void bootstrap();
