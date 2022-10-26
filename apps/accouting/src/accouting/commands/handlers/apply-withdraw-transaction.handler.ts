import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus } from '@libs/event-sourcing';
import { v4 as uuid } from 'uuid';
import { Transaction } from 'src/accouting/models/transaction.model';
import { UserRepository } from 'src/user/user.repository';
import { TRANSACTION_TYPES } from 'src/accouting/constants';
import { ApplyWithdrawTransactionCommand } from '../impl/apply-withdraw-transaction.handler';

@CommandHandler(ApplyWithdrawTransactionCommand)
export class ApplyWithdrawTransactionHandler
  implements ICommandHandler<ApplyWithdrawTransactionCommand>
{
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: ApplyWithdrawTransactionCommand) {
    const id = uuid();

    let user = await this.userRepository.findOne(command.dto.userId);

    user.balance += command.dto.value;

    const transaction = new Transaction(id);

    transaction.applyTransaction({
      userId: command.dto.userId,
      type: TRANSACTION_TYPES.income,
      credit: command.dto.value,
      debit: 0,
      description: `Withdraw transaction for task - ${command.dto.taskId}`,
      reason: command.dto.reason,
    });

    this.eventBus.publishAll(transaction.getUncommittedEvents());

    await transaction.commit();
    await user.save();
    return id;
  }
}
