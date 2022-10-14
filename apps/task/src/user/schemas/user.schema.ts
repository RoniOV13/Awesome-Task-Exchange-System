import { isUUID } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
  collection: 'users',
})
export class UserSchema {
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
