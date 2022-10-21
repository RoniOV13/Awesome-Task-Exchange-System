import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
export const KAKFA_CLIENT_SYMBOL = Symbol('AUTH_SERVICE');

const USER_STREAM_TOPIC = "user-stream";
const USER_TOPIC = "user";

export function getKafkaModuleConfig(
  clientId = 'auth',
  groupId = 'auth-consumer',
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


type UserCreatedEvent = {
  eventId: string,
  eventName: string;
  eventVersion: number;
  eventTime: string;
  producer: string;
  payload: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
};

type ChangedRoleEvent = {
  eventId: string,
  eventName: string;
  eventVersion: number;
  eventTime: string;
  producer: string;
  payload: {
    id: string;
    role: string;
  };
};

type UserUpdatedEvent = {
  eventId: string,
  eventName: string;
  eventVersion: number;
  eventTime: string;
  producer: string;
  payload: {
    id: string;
    username: string;
    email: string;
  };
};


@Injectable()
export class UserAdapter implements OnModuleInit {
  readonly #logger = new Logger('AUTH_SERVICE');

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

  async createUser(message: UserCreatedEvent): Promise<void> {
    this.kafka.emit(USER_STREAM_TOPIC, message);
  }

  async updateUser(message: UserUpdatedEvent): Promise<void> {
    this.kafka.emit(USER_STREAM_TOPIC, message);
  }

  async changeRole(message: ChangedRoleEvent): Promise<void> {
    this.kafka.emit(USER_TOPIC, message);
  }
}
