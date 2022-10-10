import { isUUID } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export const userSchemaParams = {
  timestamps: true,
  versionKey: false,
  collection: 'users',
}

const SchemaTypes = mongoose.Schema.Types
@Schema(userSchemaParams)
export class UserSchema extends Document {
  @Prop({
    type: String,
    validators: isUUID,
    required: true,
    unique: true,
    index: true,
  })
  id: string;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  role: string;
}
