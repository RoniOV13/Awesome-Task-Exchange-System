import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.connectMicroservice({
    name: 'ACCOUNTING_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
        clientId: 'accounting',
      },
      consumer: {
        groupId: 'accounting-consumer',
        allowAutoTopicCreation: true,
      },
    },
  });

  await app.startAllMicroservices();

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('accounting example')
    .setDescription('The accounting API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3002, () => {
    console.log(`server start on http://localhost:3002`);
  });
}
bootstrap();
