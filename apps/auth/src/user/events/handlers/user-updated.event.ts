import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserUpdatedEvent } from '../impl/user-updated.event';
import { UserAdapter } from '../../adapters/user.adapter';
import { v4 as uuid } from 'uuid';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(private readonly userAdapter: UserAdapter) {}
  handle(event: UserUpdatedEvent) {
    this.userAdapter.updateUser({
      eventId: uuid(),
      eventName: 'UserUpdated',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'auth_service',
      payload: {
        id: event.id,
        username: event.username,
        email: event.email,
      },
    });
  }
}
