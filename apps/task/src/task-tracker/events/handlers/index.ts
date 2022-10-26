import { TaskCompletedHandler } from "./task-completed.event";
import { TaskCreatedHandler } from "./task-created.event";
import { TaskUpdatedHandler } from "./task-updated.event";
import { TaskReassignedHandler } from "./task-reassigned.event";
import { TaskAssignedHandler } from "./task-assigned.event";
import { TaskDeletedHandler } from "./task-deleted.event";

export const EventHandlers = [TaskReassignedHandler, TaskUpdatedHandler, TaskCreatedHandler, TaskDeletedHandler, TaskCompletedHandler, TaskAssignedHandler];
