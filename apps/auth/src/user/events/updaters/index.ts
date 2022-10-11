import { ChangedRoleUpdater } from "./changed-role.updater";
import { UserCreatedUpdater } from "./user-created.updater";
import { UserUpdatedUpdater } from "./user-updated.updater";

export const StateUpdaters = [UserCreatedUpdater, UserUpdatedUpdater, ChangedRoleUpdater];
