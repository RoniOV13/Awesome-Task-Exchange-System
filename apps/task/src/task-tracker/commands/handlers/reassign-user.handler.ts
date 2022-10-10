import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserRepository } from 'src/user/user.repository';
import { ReassignUserCommand } from '../impl/reassign-user.command';

@CommandHandler(ReassignUserCommand)
export class ReassignUserHandler
  implements ICommandHandler<ReassignUserCommand>
{
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly userRepository: UserRepository,
    @InjectModel('User')
    private readonly model: Model<UserSchema>,
  ) {}
  async execute(command: ReassignUserCommand) {
    console.log('ReassigneUserCommand...');
    
    const users = await this.userRepository.findAll({ role: 'employee' });

    const task = await this.repository.findOneById(command.id);

    const listEmployee = users.filter((user) => user.id !== task.assigne);

    let employee =
      listEmployee[Math.floor(Math.random() * listEmployee.length)];

    task.assigne = employee.id;

    this.eventBus.publishAll(task.getUncommittedEvents());
    await task.commit();
    return task;
  }
}
