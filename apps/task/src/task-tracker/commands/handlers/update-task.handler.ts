import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';
import { TaskRepository } from 'src/task-tracker/repository/task-tracker.repository';
import { UpdateTaskCommand } from '../impl/update-task.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher
  ) { }
  async execute(command: UpdateTaskCommand) {
    console.log('UpdateTaskCommand...');
    const task = await this.repository.findOneById(command.id);
    task.updateTask(command.id, command.dto);

    this.eventBus.publishAll(task.getUncommittedEvents());
    await task.commit();
    return task;
  }
}