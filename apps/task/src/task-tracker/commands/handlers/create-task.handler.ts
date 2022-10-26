import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus } from '@libs/event-sourcing';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskCommand } from '../impl/create-task.handler';
import { Task } from 'src/task-tracker/models/task.model';
import { UserRepository } from 'src/user/user.repository';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateTaskCommand) {

    const id = uuid();

    const task = new Task(id);
   
    task.createTask(command.dto);
     
    this.eventBus.publishAll(task.getUncommittedEvents());

    await task.commit();

    return id;
  }
}
