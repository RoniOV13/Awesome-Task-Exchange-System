import { EventSourcingModule } from '@libs/event-sourcing';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/auth`),
    EventSourcingModule.forRoot({
      mongoURL: `mongodb://localhost:27017/auth`,
      connectOptions: { },
      collectionsOptions: {
        eventsCollectionName: 'event-store',
        snapshotsCollectionName: 'event-snapshots',
        transactionsCollectionName: 'event-transactions',
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
