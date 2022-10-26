import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionCreatedEvent } from '../events/impl/transaction-created.event';

export class Transaction extends AggregateRoot {
  public readonly id: string;
  public userId: string;
  public type: string;
  public debit: number;
  public credit: number;
  public description: string;
  public reason: string;
  public createdAt: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  onTransactionCreatedEvent(event: TransactionCreatedEvent) {
    this.userId = event.userId;
    this.debit = event.debit;
    this.credit = event.debit;
    this.description = event.description;
    this.reason = event.reason;
    this.createdAt = event.createdAt;
  }

  createTransaction(data: any) {
    const createdAt = new Date(Date.now()).toISOString();
 
    this.apply(
      new TransactionCreatedEvent(
        this.id,
        data.userId,
        data.type,
        data.debit,
        data.credit,
        data.description,
        data.reason,
        createdAt,
      ),
    );
  }

}
