import { UserCreatedEvent } from './../impl/user-created.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserAdapter } from '../../adapters/user.adapter'
import { v4 as uuid } from 'uuid';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly userAdapter: UserAdapter,
  ) { }

  handle(event: UserCreatedEvent) {
    this.userAdapter.createUser({
      eventId: uuid(),
      eventName:'UserCreated',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'auth_service',
      payload: {
        id: event.id,
        username: event.username,
        email: event.email,
        role: event.role,
      }
    })
  }
}

