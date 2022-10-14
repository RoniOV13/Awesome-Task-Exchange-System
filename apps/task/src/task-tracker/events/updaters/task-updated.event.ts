import { InjectModel } from '@nestjs/mongoose'
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing'
import { Model } from 'mongoose'
import { Logger } from '@nestjs/common'
import { TaskTrackerSchema } from 'src/task-tracker/schemas/task-tracker.schema'
import { TaskUpdatedEvent } from '../impl/task-updated.event'

@ViewUpdaterHandler(TaskUpdatedEvent)
export class TaskUpdatedUpdater
implements IViewUpdater<TaskUpdatedEvent>
{
  private readonly logger = new Logger(TaskUpdatedUpdater.name)
  constructor(
    @InjectModel(TaskTrackerSchema.name)
    private readonly model: Model<TaskTrackerSchema & Document>,
  ) {}

  async handle(event: TaskUpdatedEvent) {
    await this.model.findOneAndUpdate({ id: event.id }, {$set: event});
}
}