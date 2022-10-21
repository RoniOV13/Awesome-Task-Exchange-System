import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus } from '@libs/event-sourcing';
import { v4 as uuid } from 'uuid';
import { QueryBus } from '@nestjs/cqrs';
import { Transaction } from 'src/accouting/models/transaction.model';
import { UserRepository } from 'src/user/user.repository';
import { ApplyDepositTransactionCommand } from '../impl/apply-deposit-transaction.handler';
import { TRANSACTION_TYPES } from 'src/accouting/constants';

@CommandHandler(ApplyDepositTransactionCommand)
export class ApplyDepositTransactionHandler
  implements ICommandHandler<ApplyDepositTransactionCommand>
{
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly queryBus: QueryBus,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: ApplyDepositTransactionCommand) {
    const id = uuid();

    let user = await this.userRepository.findOne(command.dto.userId);

    user.balance -= command.dto.value;

    const transaction = new Transaction(id);

    transaction.createTransaction({
      userId: command.dto.userId,
      type: TRANSACTION_TYPES.expense,
      credit: 0,
      debit: command.dto.value,
      description: `Deposit transaction for task - ${command.dto.taskId}`,
      reason: command.dto.reason,
    });

    this.eventBus.publishAll(transaction.getUncommittedEvents());

    await transaction.commit();
    await user.save();
    return id;
  }
}
