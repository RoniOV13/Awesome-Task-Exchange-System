import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Logger } from '@nestjs/common';
import { TaskTrackerSchema } from 'src/task-tracker/schemas/task-tracker.schema';
import { ReassignedEvent } from '../impl/reassigned.event';

@ViewUpdaterHandler(ReassignedEvent)
export class ReassignedUpdater
implements IViewUpdater<ReassignedEvent>
{
  private readonly logger = new Logger(ReassignedUpdater.name)
  constructor(
    @InjectModel(TaskTrackerSchema.name)
    private readonly model: Model<TaskTrackerSchema & Document>,
  ) {}

  
  async handle(event: ReassignedEvent) {
    console.log("ressigne",event )
   await this.model.findOneAndUpdate({ id: event.id }, {$set: {assigne: event.assigne}});
}
}