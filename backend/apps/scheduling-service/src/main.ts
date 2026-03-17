import { NestFactory } from '@nestjs/core';
import { SchedulingServiceModule } from './scheduling-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SchedulingServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'scheduling_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
