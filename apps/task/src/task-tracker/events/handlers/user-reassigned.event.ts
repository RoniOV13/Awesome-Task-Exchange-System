import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserReassignedEvent } from '../impl/user-reassigned.event';

@EventsHandler(UserReassignedEvent)
export class UserReassignedHandler implements IEventHandler<UserReassignedEvent> {
  constructor(
  ) { }

  handle(event: UserReassignedEvent) {
   
    console.log(
      JSON.stringify(event, null, 2),
    );
  }
}

