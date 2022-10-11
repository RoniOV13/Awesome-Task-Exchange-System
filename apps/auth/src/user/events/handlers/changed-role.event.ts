import {ChangedRoleEvent } from '../impl/change-role.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserAdapter } from '../../adapters/user.adapter';
@EventsHandler(ChangedRoleEvent)
export class ChangeRoleHandler implements IEventHandler<ChangedRoleEvent> {
  constructor(private readonly userAdapter: UserAdapter) {}
  handle(event: ChangedRoleEvent) {
    this.userAdapter.changeRole(event);

  }
}

