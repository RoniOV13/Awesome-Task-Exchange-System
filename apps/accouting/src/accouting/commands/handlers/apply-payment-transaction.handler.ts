import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus } from '@libs/event-sourcing';
import { v4 as uuid } from 'uuid';
import { UserRepository } from 'src/user/user.repository';
import { ApplyPaymentTransactionCommand } from '../impl/apply-payment-transaction.handler';
import { Transaction } from 'src/accouting/models/transaction.model';
import { REASON_TYPES, TRANSACTION_TYPES } from 'src/accouting/constants';

@CommandHandler(ApplyPaymentTransactionCommand)
export class ApplyPaymentTransactionHandler
  implements ICommandHandler<ApplyPaymentTransactionCommand>
{
  constructor(
    private readonly eventBus: StoreEventBus,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ userId }: ApplyPaymentTransactionCommand) {
    const id = uuid();

    let user = await this.userRepository.findOne(userId);

    if (user.balance > 0) {
      const transaction = new Transaction(id);

      transaction.applyTransaction({
        userId: userId,
        type: TRANSACTION_TYPES.payment,
        credit: 0,
        debit: user.balance,
        description: 'Payment transaction',
        reason: REASON_TYPES.PAYMENT,
      });

      this.eventBus.publishAll(transaction.getUncommittedEvents());

      await transaction.commit();

      user.balance = 0;

      await user.save();
      return id;
    }
  }
}
