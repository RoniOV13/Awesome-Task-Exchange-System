import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from '@libs/event-sourcing';
import { v4 as uuid } from 'uuid';
import { CreateUserCommand } from '../impl/create-user.command';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { GetUserByEmailQuery } from 'src/user/queries/impl/get-user-by-email.query';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: CreateUserCommand) {
    const id = uuid();
     
    const isExistEmail = await this.queryBus.execute(new GetUserByEmailQuery(command.dto.email));
  
    if (isExistEmail) {
      throw new NotFoundException('Пользователь с данной почтой уже сущесвует');
    }
    const user = new User(id);

    user.createUser(command.dto);

    this.eventBus.publishAll(user.getUncommittedEvents());

    await user.commit();

    return id;
  }
}
