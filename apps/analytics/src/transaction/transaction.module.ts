import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionSchema } from './transaction.schema';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TransactionConsumer } from './transaction.consumer';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TransactionSchema.name,
        schema: SchemaFactory.createForClass(TransactionSchema),
      },
    ]),
    CqrsModule,
    ClientsModule.register([
      {
        name: 'ACCOUNTING_SERVICE',
        // @ts-ignore
        transport: Transport.KAFKA,
        options: {
          // @ts-ignore
          client: {
            brokers: ['localhost:9094'],
            clientId: 'accounting',
          },
          consumer: {
            groupId: 'accounting-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    UserModule,
    EventSourcingModule.forFeature(),
  ],

  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionConsumer],
  exports: [TransactionRepository],
})
export class TransactionModule {}
