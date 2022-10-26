import { Prop, raw, Schema } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';
import { REASON_TYPES, TRANSACTION_TYPES } from './constants';

@Schema({
  timestamps: true,
  versionKey: false,
  collection: 'transactions',
})
export class TransactionSchema {
  @Prop({
    type: String,
    validate: isUUID,
    required: true,
    unique: true,
    index: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
    validate: isUUID,
    index: true,
  })
  userId: string;

  @Prop({ type: String, required: true })
  type: TRANSACTION_TYPES;

  @Prop({ type: Number, default: 0 })
  debit: number;

  @Prop({ type: Number, default: 0 })
  credit: number;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: false })
  reason: REASON_TYPES;
}
