import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';
import { v4 as uuid } from 'uuid';
import { TaskAssignedEvent } from '../impl/task-assigned.event';

@EventsHandler(TaskAssignedEvent)
export class TaskAssignedHandler
  implements IEventHandler<TaskAssignedEvent>
{
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: TaskAssignedEvent) {
    this.taskAdapter.assignTask({
      eventId: uuid(),   
      eventName:'TaskAssigned',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'task_service',
      payload: {
        id: event.id,
        assignee: event.assignee,
      }
    });
  }
}
