import { StorableEvent } from '@libs/event-sourcing';

export class TaskCompletedEvent extends StorableEvent {
  eventAggregate = 'task';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly updatedAt: string
  ) {
    super();
  }
}