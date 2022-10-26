import { TaskReassignedUpdater } from "./task-reassigned.event";
import { TaskCompletedUpdater } from "./task-completed.event";
import { TaskCreatedUpdater } from "./task-created.updater";
import { TaskUpdatedUpdater } from "./task-updated.event";
import { TaskDeletedUpdater } from "./task.deleted.event";

export const StateUpdaters = [TaskUpdatedUpdater, TaskCreatedUpdater, TaskReassignedUpdater, TaskCompletedUpdater, TaskDeletedUpdater];
