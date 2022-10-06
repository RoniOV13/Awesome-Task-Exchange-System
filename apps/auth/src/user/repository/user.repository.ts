import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { EventStore } from 'src/event-sourcing';

@Injectable()
export class UserRepository {
  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<User> {
    const user = new User(id);
    const events = await this.eventStore.getEvents('user', id);
    user.loadFromHistory(events);
    console.log(events);
    return user;
  }
}
