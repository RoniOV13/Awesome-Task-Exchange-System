import { ReassignedUpdater } from "./reassigned.event";
import { TaskCompletedUpdater } from "./task-completed.event";
import { TaskCreatedUpdater } from "./task-created.updater";
import { TaskUpdatedUpdater } from "./task-updated.event";

export const StateUpdaters = [TaskUpdatedUpdater, TaskCreatedUpdater, ReassignedUpdater, TaskCompletedUpdater];
