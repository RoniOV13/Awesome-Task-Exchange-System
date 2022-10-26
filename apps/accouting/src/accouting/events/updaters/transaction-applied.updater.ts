import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@libs/event-sourcing';
import { Logger } from '@nestjs/common';
import { TransactionSchema } from 'src/accouting/schemas/transaction.schema';
import { TransactionAppliedEvent } from '../impl/transaction-applied.event';
;

@ViewUpdaterHandler(TransactionAppliedEvent)
export class TransactionAppliedUpdater
implements IViewUpdater<TransactionAppliedEvent>
{
  private readonly logger = new Logger(TransactionAppliedUpdater.name)
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

  async handle(event: TransactionAppliedEvent) {
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
