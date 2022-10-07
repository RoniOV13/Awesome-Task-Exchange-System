import { Injectable } from '@nestjs/common';
import { Task } from '../models/task.model';
import { EventStore } from 'src/event-sourcing';

@Injectable()
export class TaskRepository {
  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<Task> {
    const task = new Task(id);
    const events = await this.eventStore.getEvents('task', id);
    task.loadFromHistory(events);
    console.log(events);
    return task;
  }
}
