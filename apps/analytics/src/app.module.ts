import { TransactionModule } from './transaction/transaction.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://localhost:27017/analytics`,
    ),
    EventSourcingModule.forRoot({
      mongoURL: `mongodb://localhost:27017/analytics`,
      connectOptions: { },
      collectionsOptions: {
        eventsCollectionName: 'event-store',
        snapshotsCollectionName: 'event-snapshots',
        transactionsCollectionName: 'event-transactions',
      },
    }),
    ClientsModule.register([
      {
        name: 'ANALYTICS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'analytics',
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: 'analytics-consumer',
          },
        },
      },
    ]),
    TransactionModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
