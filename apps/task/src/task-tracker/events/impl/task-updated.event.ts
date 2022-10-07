import { StorableEvent } from 'src/event-sourcing';

export class TaskUpdatedEvent extends StorableEvent {
  eventAggregate = 'task';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly updatedAt: string,
  ) {
    super();
  }
}

