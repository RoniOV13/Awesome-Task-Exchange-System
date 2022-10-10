import { StorableEvent } from 'src/event-sourcing';

export class ChangedRoleEvent extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly role: string,
    public readonly updatedAt: string,
  ) {
    super();
  }
}

