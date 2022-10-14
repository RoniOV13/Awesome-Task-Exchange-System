import {
  Controller,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserConsumer } from './user.consumer';

const USER_STREAM_TOPIC = "user-stream"
const USER_TOPIC = "user"

@Controller({
  path: 'user',
})
export class UserController {
constructor(
  private readonly userConsumer: UserConsumer,
) {}

  @MessagePattern(USER_STREAM_TOPIC)
  async createUser(@Payload() message: any) {
    await this.userConsumer.handleEvent(message);
  }

  @MessagePattern(USER_TOPIC)
  async changeRole(@Payload() message: any) {
    await this.userConsumer.handleEvent(message);
  }

  @MessagePattern(USER_STREAM_TOPIC)
  async updateShopUsers(@Payload() message: any): Promise<void> {
    await this.userConsumer.handleEvent(message);
  }
}
