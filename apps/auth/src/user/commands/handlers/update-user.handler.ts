import { UpdateUserCommand } from '../impl/update-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/user/repository/user.repository';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher
  ) { }
  async execute(command: UpdateUserCommand) {
    console.log('UpdateUserCommand...');
    const user = await this.repository.findOneById(command.id);
    user.updateUser(command.id, command.dto);

    this.eventBus.publishAll(user.getUncommittedEvents());
    await user.commit();
    return user;
  }
}