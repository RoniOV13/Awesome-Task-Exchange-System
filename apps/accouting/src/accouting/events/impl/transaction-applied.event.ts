import { StorableEvent } from '@libs/event-sourcing';

export class TransactionAppliedEvent extends StorableEvent {
  eventAggregate = 'transaction';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: string,
    public readonly debit: number,
    public readonly credit: number,
    public readonly description: string,
    public readonly reason: string,
    public readonly createdAt: string,
  ) {
    super();
  }
}
