import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import {
  CREATE_TASK_TOPIC,
  UPDATE_UPDATE_TOPIC,
  COMPLETE_TASK_TOPIC,
  REASSIGN_USER_TOPIC,
} from 'src/common/kafka/kafka-topics';
export const KAKFA_CLIENT_SYMBOL = Symbol('TASK_TRACKER_SERVICE');

export function getKafkaModuleConfig(
  clientId = 'task-tracker',
  groupId = 'task-tracker-consumer',
) {
  const config = {
    name: KAKFA_CLIENT_SYMBOL,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9093'],
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

@Injectable()
export class TaskAdapter implements OnModuleInit {
  readonly #logger = new Logger('TASK_TRACKER_SERVICE');

  constructor(@Inject(KAKFA_CLIENT_SYMBOL) readonly kafka: ClientKafka) {}

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

  async createTask(message: any): Promise<void> {
    this.kafka.emit(CREATE_TASK_TOPIC, message);
  }

  async updateTask(message: any): Promise<void> {
    this.kafka.emit(UPDATE_UPDATE_TOPIC, message);
  }

  async completeTask(message: any): Promise<void> {
    this.kafka.emit(COMPLETE_TASK_TOPIC, message);
  }

  async reassignUser(message: any): Promise<void> {
    this.kafka.emit(REASSIGN_USER_TOPIC, message);
  }
}
