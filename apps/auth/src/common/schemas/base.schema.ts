import { Prop, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { isUUID } from 'class-validator'

@Schema({
  timestamps: false,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class BaseSchema extends Document {
  @Prop({
    type: String,
    validators: isUUID,
    required: true,
    unique: true,
    index: true,
  })
    id: string
}
