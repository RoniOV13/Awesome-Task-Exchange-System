import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionConsumer } from './transaction.consumer';

const TRANSACTION_STREAM_TOPIC = 'transaction-stream'
const TRANSACTION_TOPIC = 'transaction'

@Controller({
  path: 'transaction',
})
export class TransactionController {
  constructor(private readonly transactionConsumer: TransactionConsumer) {}

  @MessagePattern(TRANSACTION_STREAM_TOPIC)
  async listenTransactionStream(@Payload() message: any) {
    await this.transactionConsumer.handleEvent(message);
  }

  @MessagePattern(TRANSACTION_TOPIC)
  async listenTransaction(@Payload() message: any) {
    console.log('transaction', message)
    await this.transactionConsumer.handleEvent(message);
  }
}
