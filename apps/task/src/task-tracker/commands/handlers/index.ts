import { ReassignUserCommand } from "../impl/reassign-user.command";
import { CreateTaskHandler } from "./create-task.handler";

export const CommandHandlers = [CreateTaskHandler, ReassignUserCommand, CreateTaskHandler];
