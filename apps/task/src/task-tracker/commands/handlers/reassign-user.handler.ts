import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { UserSchema } from 'src/user/schemas/user.schema';
import { ReassignTaskCommand } from '../impl/reassign-user.command';

@CommandHandler(ReassignTaskCommand)
export class ReassignTaskHandler
  implements ICommandHandler<ReassignTaskCommand>
{
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher,
    @InjectModel('User')
    private readonly model: Model<UserSchema>,
  ) {}
  async execute(command: ReassignTaskCommand) {
    console.log('ReassigneUserCommand...');
    const users = await this.model.find({ role: 'employee' });

    const task = await this.repository.findOneById(command.id);

    const listEmployee = users.filter((user) => user.id !== task.assigne);

    if (!listEmployee.length) {
      throw new NotFoundException(
        'Задача не может быть создана из-за отстуствия исполнителя',
      );
    }

    let employee =
      listEmployee[Math.floor(Math.random() * listEmployee.length)];

    task.assigne = employee.id;

    this.eventBus.publishAll(task.getUncommittedEvents());
    await task.commit();
    return task;
  }
}
