import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TransactionAdapter } from 'src/accouting/adapters/transaction.adapter';
import { TransactionCreatedEvent } from '../impl/transaction-created.event';
import { v4 as uuid } from 'uuid';

@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedHandler
  implements IEventHandler<TransactionCreatedEvent>
{
  constructor(private readonly transactionAdapter: TransactionAdapter) {}
  handle(event: TransactionCreatedEvent) {
    this.transactionAdapter.createTransaction({
      eventId: uuid(),
      eventName: 'TransactionCreated',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'accounting_service',
      payload: {
        id: event.id,
        userId: event.userId,
        type: event.type,
        debit: event.debit,
        credit: event.credit,
        description: event.description,
        reason: event.reason,
      },
    });
  }
}
