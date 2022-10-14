import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserConsumer {
  constructor(
    private readonly repository: UserRepository
  ) {}

  async handleEvent(event: any) {
    console.log('event', event)
    switch (event.eventName) {
      case 'UserCreated':
         await this.repository.create(event.payload);
        break;
      case 'ChangedRoleEvent':
        await this.repository.changeRole(event.payload);
        break;
      case 'UserUpdatedEvent':
        await this.repository.update(event.payload);
        break;
      default:
        throw new Error('Event not consumed');
    }
  }
}