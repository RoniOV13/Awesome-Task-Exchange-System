import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
export const KAKFA_CLIENT_SYMBOL = Symbol('TASK_TRACKER_SERVICE');

let SchemaTaskCreatedV2 = require('../../../../schema-registry/schemas/task/created/v2.json');
let SchemaTaskUpdatedV2 = require('../../../../schema-registry/schemas/task/updated/v2.json');

let jsv = require('JSV').JSV.createEnvironment();

const TASK_TOPIC = "task"
const TASK_STREAM_TOPIC = "task-stream"

export function getKafkaModuleConfig(
  clientId = 'task-tracker',
  groupId = 'task-tracker-consumer',
) {
  const config = {
    name: 'TASK_TRACKER_SERVICE',
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
  eventId: string;
  eventName: string;
  eventVersion: number;
  eventTime: string;
  producer: string;
  payload: {
    id: string;
  };
};
type ReassignedEvent = {
  eventId: string;
  eventName: string;
  eventVersion: number;
  eventTime: string;
  producer: string;
  payload: {
    id: string;
    assignee: string;
  };
};
type TaskUpdatedEvent = {
  eventId: string;
  eventName: string;
  eventVersion: number;
  eventTime: string;
  producer: string;
  payload: {
    id: string;
    title: string;
    jiraId: string;
    description: string;
  };
};
type TaskCreatedEvent = {
  eventId: string;
  eventName: string;
  eventVersion: number;
  eventTime: string;
  producer: string;
  payload: {
    id: string;
    title: string;
    jiraId: string;
    description: string;
    assignee: string;
  };
};

@Injectable()
export class TaskAdapter implements OnModuleInit {
  readonly #logger = new Logger('TASK_TRACKER_SERVICE');

  constructor(@Inject('TASK_TRACKER_SERVICE') readonly kafka: ClientKafka) {}

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

    const result = jsv.validate(message, SchemaTaskCreatedV2);

    console.log('schemwqa', result.errors);
    if (result) {
      this.kafka.emit(TASK_STREAM_TOPIC, message);

      return;
    }
    throw new NotFoundException('Schema is not valid');
  }

  async updateTask(message: TaskUpdatedEvent): Promise<void> {
   console.log('')
   const result = jsv.validate(message, SchemaTaskUpdatedV2);
    if (result) {
      console.log('')
      this.kafka.emit(TASK_STREAM_TOPIC, message);
      return;
    } else {
      message.eventVersion = 1;
      this.kafka.emit(TASK_STREAM_TOPIC, message);
    }
  }

  async completeTask(message: TaskCompletedEvent): Promise<void> {
    this.kafka.emit(TASK_TOPIC, message);
  }

  async reassign(message: ReassignedEvent): Promise<void> {
    this.kafka.emit(TASK_TOPIC, message);
  }
}
