import { UserCreatedEvent } from './../impl/user-created.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserProviderAdapter } from '../../adapters/user-provider.adapter'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly userProviderAdapter: UserProviderAdapter,
  ) { }

  handle(event: UserCreatedEvent) {
    this.userProviderAdapter.createUser(event)
    console.log(
      JSON.stringify(event, null, 2),
    );
  }
}

