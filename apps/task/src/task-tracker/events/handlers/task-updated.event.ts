import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskUpdatedEvent } from '../impl/task-updated.event';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';
import { v4 as uuid } from 'uuid';

@EventsHandler(TaskUpdatedEvent)
export class TaskUpdatedHandler implements IEventHandler<TaskUpdatedEvent> {
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: TaskUpdatedEvent) {
    this.taskAdapter.updateTask({
      eventId: uuid(),   
      eventName:'TaskUpdated',
      eventVersion: 2,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'task_service',
      payload: {
        id: event.id,
        title: event.title,
        jiraId: event.jiraId,
        description: event.description,
      }
    });
  }
}

