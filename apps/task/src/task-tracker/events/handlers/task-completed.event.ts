import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TaskCompletedEvent } from '../impl/task-completed.event';

@EventsHandler(TaskCompletedEvent)
export class TaskCompletedHandler implements IEventHandler<TaskCompletedEvent> {
  constructor(
  ) { }

  handle(event: TaskCompletedEvent) {
   
    console.log(
      JSON.stringify(event, null, 2),
    );
  }
}

