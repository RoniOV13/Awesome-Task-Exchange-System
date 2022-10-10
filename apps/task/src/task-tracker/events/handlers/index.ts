import { TaskCompletedHandler } from "./task-completed.event";
import { TaskCreatedHandler } from "./task-created.event";
import { TaskUpdatedHandler } from "./task-updated.event";
import { UserReassignedHandler } from "./user-reassigned.event";

export const EventHandlers = [UserReassignedHandler, TaskUpdatedHandler, TaskCreatedHandler, TaskCompletedHandler];
