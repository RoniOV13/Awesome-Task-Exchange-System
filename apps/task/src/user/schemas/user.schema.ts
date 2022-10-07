import { isUUID } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';


@Schema({
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
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
