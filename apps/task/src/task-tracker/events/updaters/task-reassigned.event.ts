import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Logger } from '@nestjs/common';
import { TaskTrackerSchema } from 'src/task-tracker/schemas/task-tracker.schema';
import { TaskReassignedEvent } from '../impl/task-reassigned.event';


@ViewUpdaterHandler(TaskReassignedEvent)
export class TaskReassignedUpdater
implements IViewUpdater<TaskReassignedEvent>
{
  private readonly logger = new Logger(TaskReassignedUpdater.name)
  constructor(
    @InjectModel(TaskTrackerSchema.name)
    private readonly model: Model<TaskTrackerSchema & Document>,
  ) {}

  
  async handle(event: TaskReassignedEvent) {
   await this.model.findOneAndUpdate({ id: event.id }, {$set: {assignee: event.assignee}});
}
}