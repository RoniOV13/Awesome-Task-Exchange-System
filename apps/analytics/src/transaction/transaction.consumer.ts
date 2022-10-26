import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionConsumer {
  constructor(
    private readonly repository: TransactionRepository
  ) {}

  async handleEvent(event: any) {
    switch (event.eventName) {
      case 'TransactionApplied':
         await this.repository.create(event.payload);
        break;
      default:
        throw new Error('Event not consumed');
    }
  }
}