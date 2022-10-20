import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskCompletedEvent } from '../impl/task-completed.event';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';
import { v4 as uuid } from 'uuid';

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedHandler implements IEventHandler<TaskCompletedEvent> {
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: TaskCompletedEvent) {
    this.taskAdapter.completeTask({
      eventId: uuid(),   
      eventName:'TaskCompleted',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'task_service',
      payload: {
        id: event.id
      }
    });
  }
}



