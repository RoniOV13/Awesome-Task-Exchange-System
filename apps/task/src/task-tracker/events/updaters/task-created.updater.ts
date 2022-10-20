import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Logger } from '@nestjs/common';
import { TaskCreatedEvent } from '../impl/task-created.event';
import { TaskTrackerSchema } from 'src/task-tracker/schemas/task-tracker.schema';

@ViewUpdaterHandler(TaskCreatedEvent)
export class TaskCreatedUpdater
implements IViewUpdater<TaskCreatedEvent>
{
  private readonly logger = new Logger(TaskCreatedUpdater.name)
  constructor(
    @InjectModel(TaskTrackerSchema.name)
    private readonly model: Model<TaskTrackerSchema & Document>,
  ) {}

  private async isTaskExist(id: string) {
    const task = await this.model.findOne({ id })

    return !!task
  }

  private async clearTask(id: string) {
    return await this.model.findOneAndDelete({ id })
  }

  async handle(event: TaskCreatedEvent) {
    if (await this.isTaskExist(event.id)) await this.clearTask(event.id)

    const task = new this.model({
      id: event.id,
      title: event.title,
      assignee: event.assignee,
      description: event.description,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    });

    await task.save();
  }
}
