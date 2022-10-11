import { CompleteTaskHandler } from "./complete-task.handler";
import { CreateTaskHandler } from "./create-task.handler";
import { ReassignHandler } from "./reassign.handler";
import { UpdateTaskHandler } from "./update-task.handler";

export const CommandHandlers = [CreateTaskHandler, ReassignHandler, UpdateTaskHandler, CompleteTaskHandler];
