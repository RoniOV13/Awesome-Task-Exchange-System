import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { EventSourcingModule } from '@libs/event-sourcing';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './repository/user.repository';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { StateUpdaters } from './events/updaters';
import { getKafkaModuleConfig, UserAdapter } from './adapters/user.adapter';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
    CqrsModule,
    getKafkaModuleConfig(),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        // @ts-ignore
        transport: Transport.KAFKA,
        options: {
          // @ts-ignore
          client: {
            brokers: ['localhost:9094'],
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

  controllers: [UserController],
  providers: [
    UserAdapter,
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...StateUpdaters,
  ],
  exports: [],
})
export class UserModule {}
