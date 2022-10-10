import { ChangeRoleHandler } from './changed-role.event';
import { UserCreatedHandler } from './user-created.event';
import { UserUpdatedHandler } from './user-updated.event';

export const EventHandlers = [UserCreatedHandler, ChangeRoleHandler, UserUpdatedHandler];
