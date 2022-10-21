import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionSchema } from 'src/accouting/schemas/transaction.schema';
import { GetAllTransactionsQuery } from '../impl/get-all-transaction.query';

@QueryHandler(GetAllTransactionsQuery)
export class GetAllTransactionsHandler implements IQueryHandler<GetAllTransactionsQuery> {
  constructor(
    @InjectModel(TransactionSchema.name)
    private readonly model: Model<TransactionSchema & Document>,
  ) {}

  async execute({query, select, params}: GetAllTransactionsQuery) {
    return await this.model.find(query, { ...select, _id: 0 }, params).lean()
  }
}
