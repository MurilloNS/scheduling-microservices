import { NestFactory } from '@nestjs/core';
import { SchedulingServiceModule } from './scheduling-service.module';

async function bootstrap() {
  /*const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SchedulingServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: QUEUES.SCHEDULING_COMMAND_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();*/

  const app = await NestFactory.create(SchedulingServiceModule);

  await app.listen(3000);
}

void bootstrap();
