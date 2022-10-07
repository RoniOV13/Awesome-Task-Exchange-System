import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from 'src/event-sourcing';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TaskTrackerSchema } from './schemas/task-tracker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TaskTracker', schema: TaskTrackerSchema, collection: 'task-tracker' },
    ]),
    CqrsModule,
    ClientsModule.register([
      {
        name: 'TASK_TRACKER_SERVICE',
        // @ts-ignore
        transport: Transport.KAFKA,
        options: {
          // @ts-ignore
          client: {
            brokers: ['kafka:9093'],
            clientId: 'task-tracker',
          },
          consumer: {
            groupId: 'task-tracker-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),

    EventSourcingModule.forFeature(),
  ],

  controllers: [],
  providers: [

  ],
  exports: [],
})
export class UserModule {}
