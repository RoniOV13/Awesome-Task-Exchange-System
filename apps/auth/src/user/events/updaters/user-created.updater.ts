import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { UserCreatedEvent } from '../impl/user-created.event';
import { UserSchema } from 'src/user/schemas/user.schema';

@ViewUpdaterHandler(UserCreatedEvent)
export class UserCreatedUpdater implements IViewUpdater<UserCreatedEvent> {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
  ) { }

  private async isUserExist(id: string) {
    const user = await this.model.findOne({ id })

    return !!user
  }

  private async clearUser(id: string) {
    return await this.model.findOneAndDelete({ id })
  }

  async handle(event: UserCreatedEvent) {
    if (await this.isUserExist(event.id)) await this.clearUser(event.id)

    const user = new this.model({
      id: event.id,
      username: event.username,
      email: event.email,
      password: event.password,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });

    await user.save();
  }
}
