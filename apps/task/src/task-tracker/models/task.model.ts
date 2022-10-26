import { AggregateRoot } from '@nestjs/cqrs';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskReassignedEvent } from '../events/impl/task-reassigned.event';
import { TaskAssignedEvent } from '../events/impl/task-assigned.event';
import { TaskCompletedEvent } from '../events/impl/task-completed.event';
import { TaskCreatedEvent } from '../events/impl/task-created.event';
import { TaskUpdatedEvent } from '../events/impl/task-updated.event';
import { TaskDeletedEvent } from '../events/impl/task-deleted.event';


export class Task extends AggregateRoot {
  public readonly id: string;

  public title: string;
  public jiraId: string;
  public description: string;
  public assignee: string;
  public isOpen: boolean;


  constructor(id: string) {
    super();
    this.id = id;
  }

  onTaskCreatedEvent(event: TaskCreatedEvent) {
    this.title = event.title;
    this.jiraId = event.jiraId;
    this.description = event.description;
  }

  createTask(dto: CreateTaskDto) {
    const createdAt = new Date(Date.now()).toISOString()

    this.apply(
      new TaskCreatedEvent(
        this.id,
        dto.title,
        dto.jiraId,
        dto.description,
        createdAt,
      ),
    );
  }

 completeTask(id: string) {
    this.apply(
      new TaskCompletedEvent(
        id
      ),
    );
  }

 reassignTask(id: string, assignee: string) {
    this.apply(
      new TaskReassignedEvent(
        id,
        assignee,
      ),
    );
  }


 assignTask(id: string, assignee: string) {
  this.apply(
    new TaskAssignedEvent(
      id,
      assignee,
    ),
  );
  }

  deleteTask(id:string) {
    this.apply(
      new TaskDeletedEvent(
        id,
      ),
    );
  }

  updateTask(id: string, dto: UpdateTaskDto) {
 
    this.apply(
      new TaskUpdatedEvent(
        id,
        dto.title,
        dto.jiraId,
        dto.description,
      ),
    );
  }

}
