import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';
import { UserRepository } from 'src/user/repository/user.repository';
import { ChangeRoleCommand } from '../impl/change-role.command';

@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher
  ) { }

  async execute(command: ChangeRoleCommand) {
    console.log('ChangeRoleUserCommand...');

    let user = await this.repository.findOneById(command.changeRole.userId)
    
    user.role = command.changeRole.role

    this.eventBus.publishAll(user.getUncommittedEvents());

    await user.commit();

    return user;
  }
}
