import {ChangedRoleEvent } from '../impl/change-role.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserAdapter } from '../../adapters/user.adapter';
import { v4 as uuid } from 'uuid';

@EventsHandler(ChangedRoleEvent)
export class ChangeRoleHandler implements IEventHandler<ChangedRoleEvent> {
  constructor(private readonly userAdapter: UserAdapter) {}
  handle(event: ChangedRoleEvent) {
    this.userAdapter.changeRole({
      eventId: uuid(),
      eventName:'UserChangedRole',
      eventVersion: 1,
      eventTime: new Date(Date.now()).toISOString(),
      producer: 'auth_service',
      payload: {
        id: event.id,
        role: event.role,
      }
    });

  }
}

