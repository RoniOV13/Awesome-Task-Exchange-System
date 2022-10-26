import { QueryHandler } from '@nestjs/cqrs'
import { NotFoundException } from '@nestjs/common'
import { TransactionRepository } from 'src/accouting/repositories/transaction.repository'
import { GetTransactionByIdQuery } from '../impl/get-transaction-by-id.handler'

@QueryHandler(GetTransactionByIdQuery)
export class GetTransactionByIdHandler {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute({ id }: GetTransactionByIdQuery): Promise<unknown> {
    const transaction = await this.transactionRepository.findOneById(id)

    if (!transaction) throw new NotFoundException()

    return transaction
  }
}
