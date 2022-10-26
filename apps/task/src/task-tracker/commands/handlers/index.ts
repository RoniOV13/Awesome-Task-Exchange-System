import { AssignTaskHandler } from './assign-task.handler';
import { CompleteTaskHandler } from './complete-task.handler';
import { CreateTaskHandler } from './create-task.handler';
import { DeleteTaskHandler } from './delete-task.handler';
import { ReassignHandler } from './reassign-task.handler';
import { UpdateTaskHandler } from './update-task.handler';

export const CommandHandlers = [
  CreateTaskHandler,
  ReassignHandler,
  DeleteTaskHandler,
  UpdateTaskHandler,
  CompleteTaskHandler,
  AssignTaskHandler,
];
