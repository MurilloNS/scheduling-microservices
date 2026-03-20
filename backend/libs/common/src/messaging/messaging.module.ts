import { DynamicModule, Module } from '@nestjs/common';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

interface MessagingClientConfig {
  name: string;
  queue: string;
}

@Module({})
export class MessagingModule {
  static register(clients: MessagingClientConfig[]): DynamicModule {
    const clientsConfig: ClientProviderOptions[] = clients.map((client) => ({
      name: client.name,
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: client.queue,
        queueOptions: {
          durable: true,
        },
      },
    }));

    return {
      module: MessagingModule,
      imports: [ClientsModule.register(clientsConfig)],
      exports: [ClientsModule],
    };
  }
}
