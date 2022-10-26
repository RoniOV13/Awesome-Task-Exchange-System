import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from '@libs/event-sourcing';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { UserRepository } from 'src/user/user.repository';
import { AssignTaskCommand } from '../impl/assign-task.handler';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(AssignTaskCommand)
export class AssignTaskHandler implements ICommandHandler<AssignTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly userRepository: UserRepository,
  ) {}
  async execute(command: AssignTaskCommand) {
    const users = await this.userRepository.findAll({ role: 'employee' });

    if (!users.length) {
      throw new NotFoundException(
        'Задача не может быть назначена из-за отстуствия исполнителя',
      );
    }

    let task = await this.repository.findOneById(command.id);

    let employee = users[Math.floor(Math.random() * users.length)];

    task.assignTask(command.id, employee.id);

    this.eventBus.publishAll(task.getUncommittedEvents());
    await task.commit();
  }
}
