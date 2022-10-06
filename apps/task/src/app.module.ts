import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://mongodb:27017`,
    ),
    ClientsModule.register([
      {
        name: 'TASK_TRACKER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'task-tracker',
            brokers: ['kafka:9093'],
          },
          consumer: {
            groupId: 'task-tracker-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
