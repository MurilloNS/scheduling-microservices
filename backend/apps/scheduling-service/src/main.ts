import { NestFactory } from '@nestjs/core';
import { SchedulingServiceModule } from './scheduling-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  /*
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SchedulingServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'appointments_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();*/

  const app = await NestFactory.create(SchedulingServiceModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'appointments_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
