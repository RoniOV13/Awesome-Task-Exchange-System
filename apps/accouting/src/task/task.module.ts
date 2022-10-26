import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TaskSchema } from './schemas/task.schema';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskConsumer } from './task.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskSchema.name, schema: SchemaFactory.createForClass(TaskSchema)},
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
            brokers: ['localhost:9094'],
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

  controllers: [TaskController],
  providers: [ TaskRepository, TaskConsumer],
  exports: [ TaskRepository],
})
export class TaskModule {}
