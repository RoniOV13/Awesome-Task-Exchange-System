import { StorableEvent } from 'src/event-sourcing';

export class UserAssignedEvent extends StorableEvent {
  eventAggregate = 'task';
  eventVersion = 1;

  constructor(
    public readonly id: string,
  ) {
    super();
  }
}