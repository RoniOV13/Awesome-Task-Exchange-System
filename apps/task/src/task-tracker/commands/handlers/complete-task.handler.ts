import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from '@libs/event-sourcing';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { CompleteTaskCommand } from '../impl/complete-task.handler';

@CommandHandler(CompleteTaskCommand)
export class CompleteTaskHandler implements ICommandHandler<CompleteTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher,
  ) {}

  async execute(command: CompleteTaskCommand) {
 
    const task = await this.repository.findOneById(command.id);

    task.completeTask(command.id)

    this.eventBus.publishAll(task.getUncommittedEvents());

    await task.commit();

    return task;
  }
}
