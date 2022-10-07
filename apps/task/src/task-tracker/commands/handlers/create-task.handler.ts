import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskCommand } from '../impl/create-task.handler';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { UserSchema } from 'src/user/schemas/user.schema';
import { Task } from 'src/task-tracker/models/task.model';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher,
    @InjectModel('User')
    private readonly model: Model<UserSchema>,
  ) {}

  async execute(command: CreateTaskCommand) {
    console.log('CreateTaskCommand...');

    const id = uuid();

    const users = await this.model.find({ role: 'employee' });

    if (!users.length) {
      throw new NotFoundException('Задача не может быть создана из-за отстуствия исполнителя');
    }
    const task = new Task(id);

    task.createTask(command.dto);

    this.eventBus.publishAll(task.getUncommittedEvents());

    await task.commit();

    return id;
  }
}
