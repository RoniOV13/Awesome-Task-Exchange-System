import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskUpdatedEvent } from '../impl/task-updated.event';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';
import { v4 as uuid } from 'uuid';
import { TaskDeletedEvent } from '../impl/task-deleted.event';

@EventsHandler(TaskDeletedEvent)
export class TaskDeletedHandler implements IEventHandler<TaskDeletedEvent> {
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: TaskDeletedEvent) {
    this.taskAdapter.deleteTask({
      eventId: uuid(),   
      eventName:'TaskDeleted',
      eventVersion: 2,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'task_service',
      payload: {
        id: event.id,
      }
    });
  }
}

