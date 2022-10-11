import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskCompletedEvent } from '../impl/task-completed.event';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedHandler implements IEventHandler<TaskCompletedEvent> {
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: TaskCompletedEvent) {
    this.taskAdapter.completeTask(event);
  }
}



