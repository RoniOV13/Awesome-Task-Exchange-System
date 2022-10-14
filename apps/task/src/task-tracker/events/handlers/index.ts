import { TaskCompletedHandler } from "./task-completed.event";
import { TaskCreatedHandler } from "./task-created.event";
import { TaskUpdatedHandler } from "./task-updated.event";
import { ReassignedHandler } from "./reassigned.event";

export const EventHandlers = [ReassignedHandler, TaskUpdatedHandler, TaskCreatedHandler, TaskCompletedHandler];
