import { isUUID } from 'class-validator';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
  collection: 'tasks',
})
export class TaskSchema {
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
  jiraId: string;

  @Prop({
    type: String,
    required: true,
  })
  assignee: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isOpen: boolean;

  @Prop({ type: Number, required: true })
  cost: number;

  @Prop({ type: Number, required: true })
  paydout: number;
}
