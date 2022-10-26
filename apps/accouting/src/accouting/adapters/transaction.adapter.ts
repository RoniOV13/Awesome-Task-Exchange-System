import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

const TRANSACTION_STREAM_TOPIC = 'transaction-stream'
const TRANSACTION_TOPIC = 'transaction'

export function getKafkaModuleConfig(
  clientId = 'accounting',
  groupId = 'accounting-consumer',
) {
  const config = {
    name: 'ACCOUNTING_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
        clientId,
      },
      consumer: {
        groupId,
        allowAutoTopicCreation: true,
      },
    },
  };

  // @ts-ignore
  return ClientsModule.register([config]);
}

type TransactionAppliedEvent = {
  eventId: string,
  eventName: string,
  eventVersion: number,
  eventTime: string,
  producer: string,
  payload: {
    id: string,
    userId: string,
    type: string,
    debit: number,
    credit: number,
    description: string,
    reason: string,
  }
}


@Injectable()
export class TransactionAdapter implements OnModuleInit {
  readonly #logger = new Logger('ACCOUNTING_SERVICE');

  constructor(@Inject('ACCOUNTING_SERVICE') readonly kafka: ClientKafka) {}

  async onModuleInit() {
    await this.kafka.connect();
    this.#logger.log(
      'consumer assignments: ' +
        JSON.stringify(this.kafka.getConsumerAssignments()),
    );
  }

  async onModuleDestroy() {
    await this.kafka.close();
  }

  async applyTransaction(message: TransactionAppliedEvent): Promise<void> {
    this.kafka.emit(TRANSACTION_TOPIC, message);
  }

}
