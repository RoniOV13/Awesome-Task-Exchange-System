import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Logger } from '@nestjs/common';
import { TaskTrackerSchema } from 'src/task-tracker/schemas/task-tracker.schema';
import { TaskCompletedEvent } from '../impl/task-completed.event';

@ViewUpdaterHandler(TaskCompletedEvent)
export class TaskCompletedUpdater implements IViewUpdater<TaskCompletedEvent> {
  private readonly logger = new Logger(TaskCompletedUpdater.name);
  constructor(
    @InjectModel(TaskTrackerSchema.name)
    private readonly model: Model<TaskTrackerSchema & Document>,
  ) {}

  async handle(event: TaskCompletedEvent) {
    console.log("handle", event)
    await this.model.findOneAndUpdate(
      { id: event.id },
      { $set: { isOpen: false } },
    );
  }
}
