import { Prop, Schema } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';
import { UserSchema } from 'src/user/schemas/user.schema';


@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
  collection: 'task-tracker',
})
export class TaskTrackerSchema {
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
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    ref: UserSchema.name,
    required: true,
  })
  assigne: string;

  @Prop({
    type: Boolean,
    default: true
  })
  isOpen: boolean;

}
