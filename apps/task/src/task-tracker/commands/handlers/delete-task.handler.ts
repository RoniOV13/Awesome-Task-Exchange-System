import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from '@libs/event-sourcing';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { DeleteTaskCommand } from '../impl/delete-task.handler';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher
  ) { }
  async execute(command: DeleteTaskCommand) {
    const task = await this.repository.findOneById(command.id);
    task.deleteTask(command.id);

    this.eventBus.publishAll(task.getUncommittedEvents());
    await task.commit();
    return task;
  }
}