import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';
import { AccountingModule } from './accouting/accounting.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://localhost:27017/accounting`,
    ),
    EventSourcingModule.forRoot({
      mongoURL: `mongodb://localhost:27017/accounting`,
      connectOptions: { },
      collectionsOptions: {
        eventsCollectionName: 'event-store',
        snapshotsCollectionName: 'event-snapshots',
        transactionsCollectionName: 'event-transactions',
      },
    }),
    ClientsModule.register([
      {
        name: 'ACCOUNTING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'accounting',
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: 'accounting-consumer',
          },
        },
      },
    ]),
    AccountingModule,
    TaskModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
