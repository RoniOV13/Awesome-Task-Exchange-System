import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ReassignedEvent } from '../impl/reassigned.event';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';
import { v4 as uuid } from 'uuid';

@EventsHandler(ReassignedEvent)
export class ReassignedHandler
  implements IEventHandler<ReassignedEvent>
{
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: ReassignedEvent) {
    this.taskAdapter.reassign({
      eventId: uuid(),   
      eventName:'Reassigned',
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
