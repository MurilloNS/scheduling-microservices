import { NestFactory } from '@nestjs/core';
import { SchedulingServiceModule } from './scheduling-service.module';
import { Transport } from '@nestjs/microservices';
import { QUEUES } from '@app/common/messaging/queues';

async function bootstrap() {
  const app = await NestFactory.create(SchedulingServiceModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: QUEUES.SCHEDULING_COMMAND_QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);
}

void bootstrap();
