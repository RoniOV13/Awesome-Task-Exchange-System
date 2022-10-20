import { StorableEvent } from '@libs/event-sourcing';

export class TaskCreatedEvent extends StorableEvent {
  eventAggregate = 'task';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly assignee: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {
    super();
  }
}

