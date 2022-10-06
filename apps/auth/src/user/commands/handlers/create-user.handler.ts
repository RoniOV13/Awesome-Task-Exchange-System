import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus, StoreEventPublisher } from 'src/event-sourcing';
import { v4 as uuid } from 'uuid';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from 'src/user/models/user.model';
import { UserRepository } from 'src/user/repository/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: StoreEventBus,
    private readonly eventPublicher: StoreEventPublisher,
    @InjectModel('User')
    private readonly model: Model<User & Document>,
  ) {}

  async execute(command: CreateUserCommand) {
    console.log('CreateUserCommand...');

    const id = uuid();

    const isExistEmail = await this.model.findOne({ email: command.dto.email });

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
