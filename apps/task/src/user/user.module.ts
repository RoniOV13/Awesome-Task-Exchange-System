import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from 'src/event-sourcing';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema, collection: 'users' },
    ]),
    CqrsModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        // @ts-ignore
        transport: Transport.KAFKA,
        options: {
          // @ts-ignore
          client: {
            brokers: ['kafka:9093'],
            clientId: 'auth',
          },
          consumer: {
            groupId: 'auth-consumer',
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
