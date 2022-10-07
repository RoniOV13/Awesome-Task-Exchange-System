import { AggregateRoot } from '@nestjs/cqrs';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskCreatedEvent } from '../events/impl/task-created.event';
import { TaskUpdatedEvent } from '../events/impl/task-updated.event';


export class Task extends AggregateRoot {
  public readonly id: string;

  public title: string;
  public description: string;
  public assigne: string;
  public isOpen: boolean;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  onTaskCreatedEvent(event: TaskCreatedEvent) {
    this.title = event.title;
    this.description = event.description;
    // this.assigne = event.assigne;
    this.createdAt = event.createdAt;
    this.updatedAt = event.createdAt;
  }

  createTask(dto: CreateTaskDto) {
    const createdAt = new Date(Date.now()).toISOString(),
      updatedAt = new Date(Date.now()).toISOString();

    this.apply(
      new TaskCreatedEvent(
        this.id,
        dto.title,
        dto.description,
        // dto.assigne,
        createdAt,
        updatedAt,
      ),
    );
  }

  updateTask(id: string, dto: UpdateTaskDto) {
    const updatedAt = new Date(Date.now()).toISOString();
  
    this.apply(
      new TaskUpdatedEvent(
        id,
        dto.title,
        dto.description,
        updatedAt,
      ),
    );
  }

}
