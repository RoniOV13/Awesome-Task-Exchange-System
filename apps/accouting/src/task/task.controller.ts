import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskConsumer } from './task.consumer';

const TASK_STREAM_TOPIC = 'task-stream';
const TASK_TOPIC = 'task';

@Controller({
  path: 'task',
})
export class TaskController {
  constructor(private readonly taskConsumer: TaskConsumer) {}

  @MessagePattern(TASK_STREAM_TOPIC)
  async listenTaskStream(@Payload() message: any) {
    await this.taskConsumer.handleEvent(message);
  }

  @MessagePattern(TASK_TOPIC)
  async listenTask(@Payload() message: any) {
    await this.taskConsumer.handleEvent(message);
  }
}
