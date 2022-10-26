import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TransactionAdapter } from 'src/accouting/adapters/transaction.adapter';
import { v4 as uuid } from 'uuid';
import { TransactionAppliedEvent } from '../impl/transaction-applied.event';

@EventsHandler(TransactionAppliedEvent)
export class TransactionAppliedHandler
  implements IEventHandler<TransactionAppliedEvent>
{
  constructor(private readonly transactionAdapter: TransactionAdapter) {}
  handle(event: TransactionAppliedEvent) {
    this.transactionAdapter.applyTransaction({
      eventId: uuid(),
      eventName: 'TransactionApplied',
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
