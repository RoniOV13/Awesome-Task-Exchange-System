import { InjectModel } from '@nestjs/mongoose';
import { IViewUpdater, ViewUpdaterHandler } from 'src/event-sourcing';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ChangedRoleEvent } from '../impl/change-role.event';
import { User } from 'src/user/schemas/user.schema';

@ViewUpdaterHandler(ChangedRoleEvent)
export class ChangedRoleUpdater implements IViewUpdater<ChangedRoleEvent> {
  private readonly logger = new Logger(ChangedRoleUpdater.name);
  constructor(
    @InjectModel('User')
    private readonly model: Model<User & Document>,
  ) {}

  async handle(event: ChangedRoleEvent) {
    await this.model.findOneAndUpdate({ id: event.id }, { $set: {role: event.role }});
  }
}
