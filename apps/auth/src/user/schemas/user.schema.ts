import { Prop, Schema } from '@nestjs/mongoose';
import { isUUID, isEmail } from 'class-validator';

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
    lowercase: true,
    validate: isEmail,
    maxlength: 255,
    minlength: 6,
    index: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    default: 'employee',
  })
  role: string;
}
