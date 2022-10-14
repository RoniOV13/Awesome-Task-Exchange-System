import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://mongodb:27017/accounting`,
    ),
    EventSourcingModule.forRoot({
      mongoURL: `mongodb://mongodb:27017/accounting`,
      connectOptions: { },
      collectionsOptions: {
        eventsCollectionName: 'event-store',
        snapshotsCollectionName: 'event-snapshots',
        transactionsCollectionName: 'event-transactions',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
