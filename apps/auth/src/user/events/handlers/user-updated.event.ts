import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserUpdatedEvent } from '../impl/user-updated.event';
import { UserProviderAdapter } from '../../adapters/user-provider.adapter';
@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(private readonly userProviderAdapter: UserProviderAdapter) {}
  handle(event: UserUpdatedEvent) {
    this.userProviderAdapter.updateUser(event);
    console.log(JSON.stringify(event, null, 2));
  }
}
