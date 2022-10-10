import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { TaskModule } from './task-tracker/task-tracker.module';
import { EventSourcingModule } from './event-sourcing';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://mongodb:27017/task-tracker`,
    ),
    EventSourcingModule.forRoot({
      mongoURL: `mongodb://mongodb:27017/task-tracker`,
      connectOptions: { },
      collectionsOptions: {
        eventsCollectionName: 'event-store',
        snapshotsCollectionName: 'event-snapshots',
        transactionsCollectionName: 'event-transactions',
      },
    }),
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
    UserModule,
    TaskModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
