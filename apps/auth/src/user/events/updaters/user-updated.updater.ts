import { InjectModel } from '@nestjs/mongoose';
import { IViewUpdater, ViewUpdaterHandler } from 'src/event-sourcing';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserUpdatedEvent } from '../impl/user-updated.event';

@ViewUpdaterHandler(UserUpdatedEvent)
export class UserUpdatedUpdater implements IViewUpdater<UserUpdatedEvent> {
  private readonly logger = new Logger(UserUpdatedUpdater.name);
  constructor(
    @InjectModel('User')
    private readonly model: Model<User & Document>,
  ) {}

  async handle(event: UserUpdatedEvent) {
    await this.model.findOneAndUpdate({ id: event.id }, { $set: event});
  }
}
