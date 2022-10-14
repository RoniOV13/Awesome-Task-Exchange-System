import { InjectModel } from '@nestjs/mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ChangedRoleEvent } from '../impl/change-role.event';
import { UserSchema } from 'src/user/schemas/user.schema';

@ViewUpdaterHandler(ChangedRoleEvent)
export class ChangedRoleUpdater implements IViewUpdater<ChangedRoleEvent> {
  private readonly logger = new Logger(ChangedRoleUpdater.name);
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
  ) {}

  async handle(event: ChangedRoleEvent) {
    await this.model.findOneAndUpdate({ id: event.id }, { $set: {role: event.role }});
  }
}
