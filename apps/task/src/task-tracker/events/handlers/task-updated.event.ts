import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskUpdatedEvent } from '../impl/task-updated.event';

@EventsHandler(TaskUpdatedEvent)
export class TaskUpdatedHandler implements IEventHandler<TaskUpdatedEvent> {
  constructor(
  ) { }

  handle(event: TaskUpdatedEvent) {
   
    console.log(
      JSON.stringify(event, null, 2),
    );
  }
}

