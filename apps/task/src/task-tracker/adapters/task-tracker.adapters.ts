import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import {
  TASK_TOPIC,
  TASK_STREAM_TOPIC,
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

type TaskCompletedEvent = {
  eventId: string,
  eventName: string,
  eventVersion: number,
  eventTime: string,
  producer: string,
  payload: {
    id: string,
  }
}
type ReassignedEvent = {
  eventId: string,
  eventName: string,
  eventVersion: number,
  eventTime: string,
  producer: string,
  payload: {
    id: string,
    assignee: string,
  }
}
type TaskUpdatedEvent = {
  eventId: string,
  eventName: string,
  eventVersion: number,
  eventTime: string,
  producer: string,
  payload: {
    id: string,
    title: string,
    description: string,
  }
}
type TaskCreatedEvent = {
  eventId: string,
  eventName: string,
  eventVersion: number,
  eventTime: string,
  producer: string,
  payload: {
    id: string,
    title: string,
    description: string,
    assignee: string,
  }
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

  async createTask(message: TaskCreatedEvent): Promise<void> {
    this.kafka.emit(TASK_STREAM_TOPIC, message);
  }

  async updateTask(message: TaskUpdatedEvent): Promise<void> {
    this.kafka.emit(TASK_STREAM_TOPIC, message);
  }

  async completeTask(message: TaskCompletedEvent): Promise<void> {
    this.kafka.emit(TASK_TOPIC, message);
  }

  async reassign(message: ReassignedEvent): Promise<void> {
    this.kafka.emit(TASK_TOPIC, message);
  }
}
