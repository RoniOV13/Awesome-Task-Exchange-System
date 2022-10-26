import { Injectable } from '@nestjs/common';
import { EventStore } from '@libs/event-sourcing';
import { Transaction } from '../models/transaction.model';

@Injectable()
export class TransactionRepository {
  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<Transaction> {
    const transaction = new Transaction(id);
    const events = await this.eventStore.getEvents('transaction', id);
    transaction.loadFromHistory(events);
    return transaction;
  }
}
