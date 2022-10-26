import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskConsumer {
  constructor(private readonly repository: TaskRepository) {}

  async handleEvent(event: any) {
    switch (event.eventName) {
      case 'TaskCreated':
        if (event.eventVersion === 1) {
          event.payload.jiraId =
            event.payload.title.index.indexOf('[') < 0
              ? ''
              : event.payload.title.substring(
                  event.payload.title.index.indexOf('['),
                  event.payload.title.index.indexOf(']') + 1,
                );
          await this.repository.create(event.payload);
          break;
        }
        await this.repository.create(event.payload);
        break;
      case 'TaskAssigned':
        await this.repository.assignTask(event.payload);
        break;
      case 'TaskReassigned':
        await this.repository.reassignTask(event.payload);
        break;
      case 'TaskCompleted':
        await this.repository.completeTask(event.payload.id);
        break;
      case 'TaskUpdated':
        if (event.eventVersion === 1) {
          event.payload.jiraId =
            event.payload.title.index.indexOf('[') < 0
              ? ''
              : event.payload.title.substring(
                  event.payload.title.index.indexOf('['),
                  event.payload.title.index.indexOf(']') + 1,
                );
          await this.repository.update(event.payload);
          break;
        }
        await this.repository.update(event.payload);
        break;
      default:
        throw new Error('Event not consumed');
    }
  }
}
