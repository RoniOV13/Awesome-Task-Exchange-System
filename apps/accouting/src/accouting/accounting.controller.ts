import { ApplyPaymentTransactionCommand } from './commands/impl/apply-payment-transaction.handler';
import { UserRepository } from './../user/user.repository';
import { usePagination, useSort } from '@libs/utils';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Cron } from '@nestjs/schedule';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryOptions } from 'mongoose';
import { GetAllTransactionsQuery } from './querries/impl/get-all-transaction.query';
import { GetTransactionByIdQuery } from './querries/impl/get-transaction-by-id.handler';
import { GetTransactionsByUserIdQuery } from './querries/impl/get-transactions-by-userId.query';

@ApiTags('Accounting')
@Controller('accounting')
export class AccountingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  @Cron('0 0 * * *')
  async handleCron() {
    const users = await this.userRepository.findAll({ role: 'employee' });

    users.forEach((user) => {
      this.commandBus.execute(new ApplyPaymentTransactionCommand(user.id));
    });
  }
}
