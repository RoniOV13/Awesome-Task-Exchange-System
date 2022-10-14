import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ReassignedEvent } from '../impl/reassigned.event';
import { TaskAdapter } from 'src/task-tracker/adapters/task-tracker.adapters';

@EventsHandler(ReassignedEvent)
export class ReassignedHandler
  implements IEventHandler<ReassignedEvent>
{
  constructor(private readonly taskAdapter: TaskAdapter) {}

  handle(event: ReassignedEvent) {
    this.taskAdapter.reassign({
      eventName:'Reassigned',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'task_service',
      payload: {
        id: event.id,
        assigne: event.assigne,
      }
    });
  }
}
