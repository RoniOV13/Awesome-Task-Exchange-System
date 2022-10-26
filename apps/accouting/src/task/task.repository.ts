import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from './dto/task.dto';
import { ReassignDto } from './dto/reassign.dto';
import { TaskSchema } from './schemas/task.schema';
import { CommandBus } from '@nestjs/cqrs';
import { REASON_TYPES } from 'src/accouting/constants';
import { ApplyDepositTransactionCommand } from 'src/accouting/commands/impl/apply-deposit-transaction.handler';
import { ApplyWithdrawTransactionCommand } from 'src/accouting/commands/impl/apply-withdraw-transaction.handler';

@Injectable()
export class TaskRepository {
  readonly #logger = new Logger(TaskRepository.name);
  constructor(
    @InjectModel(TaskSchema.name)
    private readonly model: Model<TaskSchema>,
    private readonly commandBus: CommandBus,
  ) {}

  async create(document: TaskDto) {
    const task = new this.model(document);
    task.cost = this.getRandomNumberBetween(10, 20);
    task.paydout = this.getRandomNumberBetween(20, 40);

    await task.save();

    return this.commandBus.execute(
      new ApplyDepositTransactionCommand({
        userId: task.assignee,
        value: task.cost,
        taskId: task.id,
        reason: REASON_TYPES.TASK_ASSIGNED,
      }),
    );
  }

  async findAll(query: any) {
    const task = await this.model.find(query);
    return task;
  }

  getRandomNumberBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async findOne(id: string) {
    const task = await this.model.findOne({ id: id });
    if (task) {
      return task;
    } else {
      throw new NotFoundException('');
    }
  }

  async ressign(data: ReassignDto) {
    const task = await this.model.findOne({ id: data.taskId });
    task.assignee = data.assignee;
    await task.save();
    return this.commandBus.execute(
      new ApplyDepositTransactionCommand({
        userId: task.assignee,
        value: task.cost,
        taskId: task.id,
        reason: REASON_TYPES.TASK_ASSIGNED,
      }),
    );
  }

  async completeTask(taskId: string) {
    const task = await this.model.findOne({ id: taskId });
    task.isOpen = false;
    await task.save();

    return this.commandBus.execute(
      new ApplyWithdrawTransactionCommand({
        userId: task.assignee,
        value: task.paydout,
        taskId: task.id,
        reason: REASON_TYPES.TASK_COMPLETED,
      }),
    );
  }

  async update(updateTask: TaskDto) {
    return await this.model.findOneAndUpdate(
      { id: updateTask.id },
      { $set: updateTask },
    );
  }
}
