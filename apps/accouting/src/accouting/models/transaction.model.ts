import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionAppliedEvent } from '../events/impl/transaction-applied.event';

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

  onTransactionAppliedEvent(event: TransactionAppliedEvent) {
    this.userId = event.userId;
    this.debit = event.debit;
    this.credit = event.debit;
    this.description = event.description;
    this.reason = event.reason;
    this.createdAt = event.createdAt;
  }

  applyTransaction(data: any) {
    const createdAt = new Date(Date.now()).toISOString();
 
    this.apply(
      new TransactionAppliedEvent(
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
