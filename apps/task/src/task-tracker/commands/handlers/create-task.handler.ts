import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskCommand } from '../impl/create-task.handler';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { Task } from 'src/task-tracker/models/task.model';
import { UserRepository } from 'src/user/user.repository';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateTaskCommand) {
    console.log('CreateTaskCommand...');

    const id = uuid();

    const users = await this.userRepository.findAll({ role: 'employee' });

    if (!users.length) {
      throw new NotFoundException(
        'Задача не может быть создана из-за отстуствия исполнителя',
      );
    }
    const task = new Task(id);

    let employee = users[Math.floor(Math.random() * users.length)];
   
    task.createTask(command.dto, employee.id);
     
    console.log('task', task)
    this.eventBus.publishAll(task.getUncommittedEvents());

    await task.commit();

    return id;
  }
}
