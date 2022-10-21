import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventBus } from '@libs/event-sourcing';
import { v4 as uuid } from 'uuid';
import { QueryBus } from '@nestjs/cqrs';
import { TransactionRepository } from 'src/accouting/repositories/transaction.repository';
import { UserRepository } from 'src/user/user.repository';
import { GetTransactionsByUserIdQuery } from 'src/accouting/querries/impl/get-transactions-by-userId.query';
import { GetAllTransactionsHandler } from 'src/accouting/querries/handlers/get-all-transactions.handler';
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

      transaction.createTransaction({
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
