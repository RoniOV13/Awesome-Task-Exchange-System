import { TransactionRepository } from './repositories/transaction.repository';
import { getKafkaModuleConfig, TransactionAdapter } from './adapters/transaction.adapter';
import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EventSourcingModule } from '@libs/event-sourcing';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionSchema } from './schemas/transaction.schema';
import { QueryHandlers } from './querries/handlers';
import { StateUpdaters } from './events/updaters';
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
    ScheduleModule.forRoot(),
    getKafkaModuleConfig(),
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
    EventSourcingModule.forFeature(),
    UserModule
  ],

  controllers: [],
  providers: [
    TransactionAdapter,
    TransactionRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...StateUpdaters,
  ],
  exports: [],
})
export class AccountingModule {}
