import { InjectModel } from '@nestjs/mongoose'
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing'
import { Model } from 'mongoose'
import { Logger } from '@nestjs/common'
import { TaskTrackerSchema } from 'src/task-tracker/schemas/task-tracker.schema'
import { TaskDeletedEvent } from '../impl/task-deleted.event'

@ViewUpdaterHandler(TaskDeletedEvent)
export class TaskDeletedUpdater
implements IViewUpdater<TaskDeletedEvent>
{
  private readonly logger = new Logger(TaskDeletedUpdater.name)
  constructor(
    @InjectModel(TaskTrackerSchema.name)
    private readonly model: Model<TaskTrackerSchema & Document>,
  ) {}

  async handle(event: TaskDeletedEvent) {
    await this.model.findOneAndDelete({ id: event.id });
}
}