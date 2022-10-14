import { StorableEvent } from '@libs/event-sourcing';

export class UserCreatedEvent extends StorableEvent {
  eventAggregate = 'user';
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {
    super();
  }
}

