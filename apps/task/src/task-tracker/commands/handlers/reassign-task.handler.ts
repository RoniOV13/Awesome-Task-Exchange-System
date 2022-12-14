import { TaskTrackerSchema } from '../../schemas/task-tracker.schema';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoreEventBus, StoreEventPublisher } from '@libs/event-sourcing';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { UserRepository } from 'src/user/user.repository';
import { ReassignTaskCommand } from '../impl/reassign-task.handler';

@CommandHandler(ReassignTaskCommand)
export class ReassignHandler
  implements ICommandHandler<ReassignTaskCommand>
{
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly userRepository: UserRepository,
    @InjectModel(TaskTrackerSchema.name)
    private readonly taskModel: Model<TaskTrackerSchema>,
  ) {}
  async execute() {
    const users = await this.userRepository.findAll({ role: 'employee' });

    const tasks = await this.taskModel.find({ isOpen: true });

    tasks.forEach(async (item) => {
      let task = await this.repository.findOneById(item.id);

      let listEmployee = users.filter((user) => user.id !== task.assignee);

      let employee =
        listEmployee[Math.floor(Math.random() * listEmployee.length)];

      task.reassignTask(task.id, employee.id);

      this.eventBus.publishAll(task.getUncommittedEvents());
      await task.commit();
    });

    return tasks;
  }
}
