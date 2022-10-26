import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskReassignedEvent } from '../impl/task-reassigned.event';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';
import { v4 as uuid } from 'uuid';

@EventsHandler(TaskReassignedEvent)
export class TaskReassignedHandler
  implements IEventHandler<TaskReassignedEvent>
{
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: TaskReassignedEvent) {
    this.taskAdapter.reassign({
      eventId: uuid(),   
      eventName:'TaskReassigned',
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
