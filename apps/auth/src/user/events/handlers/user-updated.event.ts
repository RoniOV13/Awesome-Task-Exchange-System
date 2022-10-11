import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserUpdatedEvent } from '../impl/user-updated.event';
import { UserAdapter } from '../../adapters/user.adapter';
@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(private readonly userAdapter: UserAdapter) {}
  handle(event: UserUpdatedEvent) {
    this.userAdapter.updateUser(event);
    console.log(JSON.stringify(event, null, 2));
  }
}
