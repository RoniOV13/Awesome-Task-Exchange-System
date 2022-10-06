import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import {
  CREATE_USER_TOPIC,
  UPDATE_USER_TOPIC,
  CHANGE_ROLE_TOPIC,
} from 'src/common/kafka/kafka-topics';
export const KAKFA_CLIENT_SYMBOL = Symbol('AUTH_SERVICE');

export function getKafkaModuleConfig(
  clientId = 'auth',
  groupId = 'auth-consumer',
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
export class UserProviderAdapter implements OnModuleInit {
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

  async createUser(message: any): Promise<void> {
    this.kafka.emit(CREATE_USER_TOPIC, {
      id: message.id,
      username: message.username,
      email: message.email,
    });
  }

  async updateUser(message: any): Promise<void> {
    this.kafka.emit(UPDATE_USER_TOPIC, {
      id: message.id,
      username: message.username,
      email: message.email,
    });
  }

  async changeRole(message: any): Promise<void> {
    this.kafka.emit(CHANGE_ROLE_TOPIC, {
      id: message.id,
      role:message.role
    });
  }
}
