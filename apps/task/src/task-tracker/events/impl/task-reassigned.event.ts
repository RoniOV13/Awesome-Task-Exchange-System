import { StorableEvent } from '@libs/event-sourcing';

export class TaskReassignedEvent extends StorableEvent {
  eventAggregate = 'task';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly assignee: string,
  ) {
    super();
  }
}