import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from '@libs/event-sourcing';
import { UserRepository } from 'src/user/repository/user.repository';
import { ChangeRoleCommand } from '../impl/change-role.command';

@CommandHandler(ChangeRoleCommand)
export class ChangeRoleHandler implements ICommandHandler<ChangeRoleCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: StoreEventBus,
  ) { }

  async execute(command: ChangeRoleCommand) {
    const user = await this.repository.findOneById(command.id)
   
    user.changeRole(command)

    this.eventBus.publishAll(user.getUncommittedEvents());

    await user.commit();

    return command.id;
  }
}
