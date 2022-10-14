import { TaskCreatedEvent } from './../impl/task-created.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';

@EventsHandler(TaskCreatedEvent)
export class TaskCreatedHandler implements IEventHandler<TaskCreatedEvent> {
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: TaskCreatedEvent) {
    this.taskAdapter.createTask({
      eventName:'TaskCreated',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'task_service',
      payload: {
        id: event.id,
        title: event.title,
        description: event.description,
        assigne: event.assigne,
      }
    });
  }
}

