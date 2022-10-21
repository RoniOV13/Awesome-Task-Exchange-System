import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionRepository } from 'src/accouting/repositories/transaction.repository';
import { TransactionSchema } from 'src/accouting/schemas/transaction.schema';
import { GetTransactionsByUserIdQuery } from '../impl/get-transactions-by-userId.query';

@QueryHandler(GetTransactionsByUserIdQuery)
export class GetTransactionsByUserIdHandler
  implements IQueryHandler<GetTransactionsByUserIdQuery>
{
  constructor(
    @InjectModel(TransactionSchema.name)
    private readonly model: Model<TransactionSchema & Document>,
    private readonly repository: TransactionRepository,
  ) {}

  async execute({ userId }: GetTransactionsByUserIdQuery) {
    const transaction = await this.model.findOne({ userId });
    if (!transaction) throw new NotFoundException();
    return await this.repository.findOneById(transaction.id);
  }
}
