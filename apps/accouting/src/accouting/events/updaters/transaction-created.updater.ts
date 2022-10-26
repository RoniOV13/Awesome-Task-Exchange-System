import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Logger } from '@nestjs/common';
import { TransactionSchema } from 'src/accouting/schemas/transaction.schema';
import { TransactionCreatedEvent } from '../impl/transaction-created.event';

@ViewUpdaterHandler(TransactionCreatedEvent)
export class TransactionCreatedUpdater
implements IViewUpdater<TransactionCreatedEvent>
{
  private readonly logger = new Logger(TransactionCreatedUpdater.name)
  constructor(
    @InjectModel(TransactionSchema.name)
    private readonly model: Model<TransactionSchema & Document>,
  ) {}

  private async isTransactionExist(id: string) {
    const transaction = await this.model.findOne({ id })

    return !!transaction
  }

  private async clearTransaction(id: string) {
    return await this.model.findOneAndDelete({ id })
  }

  async handle(event: TransactionCreatedEvent) {
    if (await this.isTransactionExist(event.id)) await this.clearTransaction(event.id)

    const transaction = new this.model({
      id: event.id,
      userId: event.userId,
      type: event.type,
      debit: event.debit,
      credit: event.credit,
      description: event.description,
      reason: event.reason,
      createdAt: event.createdAt,
    });

    await transaction.save();
  }
}
