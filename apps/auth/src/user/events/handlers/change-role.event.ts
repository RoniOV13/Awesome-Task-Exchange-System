import {ChangeRoleEvent } from './../impl/change-role.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { UserProviderAdapter } from '../../adapters/user-provider.adapter';
@EventsHandler(ChangeRoleEvent)
export class ChangeRoleHandler implements IEventHandler<ChangeRoleEvent> {
  constructor(private readonly userProviderAdapter: UserProviderAdapter) {}
  handle(event: ChangeRoleEvent) {
    this.userProviderAdapter.changeRole(event);
    console.log(JSON.stringify(event, null, 2));
  }
}

