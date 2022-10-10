import { UserCreatedEvent } from './../impl/user-created.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserAdapter } from '../../adapters/user.adapter'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly userAdapter: UserAdapter,
  ) { }

  handle(event: UserCreatedEvent) {
    this.userAdapter.createUser(event)
    console.log(
      JSON.stringify(event, null, 2),
    );
  }
}

