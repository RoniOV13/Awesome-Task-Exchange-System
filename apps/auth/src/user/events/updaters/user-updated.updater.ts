import { InjectModel } from '@nestjs/mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserUpdatedEvent } from '../impl/user-updated.event';

@ViewUpdaterHandler(UserUpdatedEvent)
export class UserUpdatedUpdater implements IViewUpdater<UserUpdatedEvent> {
  private readonly logger = new Logger(UserUpdatedUpdater.name);
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
  ) {}

  async handle(event: UserUpdatedEvent) {
    await this.model.findOneAndUpdate({ id: event.id }, { $set: event});
  }
}
