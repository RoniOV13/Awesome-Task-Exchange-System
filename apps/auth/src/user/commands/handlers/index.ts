import { CreateUserHandler } from './create-user.handler';
import { UpdateUserHandler } from './update-user.handler';
import { ChangeRoleHandler } from './change-role.handler';

export const CommandHandlers = [CreateUserHandler, ChangeRoleHandler, UpdateUserHandler];
