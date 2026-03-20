import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUES } from '@app/common/messaging/queues';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: QUEUES.APPOINTMENT_CREATED,
      queueOptions: { durable: true },
    },
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: QUEUES.APPOINTMENT_UPDATED,
      queueOptions: { durable: true },
    },
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: QUEUES.APPOINTMENT_DELETED,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
