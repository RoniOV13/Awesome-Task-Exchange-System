import { TaskCreatedEvent } from './../impl/task-created.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(TaskCreatedEvent)
export class TaskCreatedHandler implements IEventHandler<TaskCreatedEvent> {
  constructor(
  ) { }

  handle(event: TaskCreatedEvent) {
   
    console.log(
      JSON.stringify(event, null, 2),
    );
  }
}

