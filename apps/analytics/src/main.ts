import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice({
    name: 'ANALYTICS_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
        clientId: 'analytics',
      },
      consumer: {
        groupId: 'analytics-consumer',
        allowAutoTopicCreation: true,
      },
    },
  });

  await app.startAllMicroservices();

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');

  await app.listen(3003, () => {
    console.log(`server start on http://localhost:3003`);
  });
}
bootstrap();
