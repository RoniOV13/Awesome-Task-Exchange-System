import { QueryHandler } from '@nestjs/cqrs'
import { NotFoundException } from '@nestjs/common'
import { GetTaskByIdQuery } from '../impl/get-task-by-id.query'
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository'

@QueryHandler(GetTaskByIdQuery)
export class GetPaymentByIdHandler {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ id }: GetTaskByIdQuery): Promise<unknown> {
    const task = await this.taskRepository.findOneById(id)

    if (!task) throw new NotFoundException()

    return task
  }
}
