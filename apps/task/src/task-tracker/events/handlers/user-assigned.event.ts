import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserAssignedEvent } from '../impl/user-assigned.event';

@EventsHandler(UserAssignedEvent)
export class UserAssignedHandler implements IEventHandler<UserAssignedEvent> {
  constructor(
  ) { }

  handle(event: UserAssignedEvent) {
   
    console.log(
      JSON.stringify(event, null, 2),
    );
  }
}

