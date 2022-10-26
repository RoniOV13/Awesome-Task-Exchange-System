import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/user.repository';

import { TransactionSchema } from './transaction.schema';

@Injectable()
export class TransactionRepository {
  readonly #logger = new Logger(TransactionRepository.name);
  constructor(
    @InjectModel(TransactionSchema.name)
    private readonly model: Model<TransactionSchema>,
    private readonly userRepository: UserRepository,
  ) {}

  async create(document: any) {
    let user = await this.userRepository.findOne(document.userId);
    user.balance += document.credit;
    user.balance -= document.debit;

    await new this.model(document).save();
    await user.save();
  }

  async findAll(query: any) {
    const transaction = await this.model.find(query);
    return transaction;
  }

  async findOne(id: string) {
    const transaction = await this.model.findOne({ id: id });
    if (transaction) {
      return transaction;
    } else {
      throw new NotFoundException('Error');
    }
  }
}
