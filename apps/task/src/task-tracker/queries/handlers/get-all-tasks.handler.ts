import { QueryHandler } from '@nestjs/cqrs'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { TaskTrackerSchema } from 'src/task-tracker/schemas/task-tracker.schema'
import { GetTasksQuery } from '../impl/get-all-task.query'

@QueryHandler(GetTasksQuery)
export class GetPaymentsHandler {
  constructor(
    @InjectModel(TaskTrackerSchema.name)
    private readonly model: Model<TaskTrackerSchema>,
  ) { }

  async execute({ query, select, params }: GetTasksQuery): Promise<unknown[]> {
    // @ts-ignore
    return await this.model.find(query, { ...select, _id: 0 }, params)
  }
}
