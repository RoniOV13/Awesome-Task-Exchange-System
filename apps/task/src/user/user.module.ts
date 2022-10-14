import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserConsumer } from './user.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: SchemaFactory.createForClass(UserSchema)},
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

  controllers: [UserController],
  providers: [ UserRepository, UserConsumer],
  exports: [ UserRepository],
})
export class UserModule {}
