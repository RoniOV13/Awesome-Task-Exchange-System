import { TaskTrackerController } from './task-tracker.controller';
import { TaskRepository } from './repository/task-tracker.repository';
import { getKafkaModuleConfig, TaskAdapter } from './adapters/task-tracker.adapters';
import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';
import { CommandHandler, CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TaskTrackerSchema } from './schemas/task-tracker.schema';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { UserModule } from 'src/user/user.module';
import { StateUpdaters } from './events/updaters';
import { AssignTaskSaga } from './sagas/assign-task.saga';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskTrackerSchema.name, schema: SchemaFactory.createForClass(TaskTrackerSchema)},
    ]),
    CqrsModule,
    getKafkaModuleConfig(),
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
    UserModule,
    EventSourcingModule.forFeature(),
  ],

  controllers: [TaskTrackerController],
  providers: [
  TaskAdapter,
  TaskRepository,
  AssignTaskSaga,
  ...CommandHandlers,
  ...EventHandlers,
  ...QueryHandlers,
  ...StateUpdaters
  ],
  exports: [],
})
export class TaskModule {}
