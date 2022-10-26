import { AssignTaskCommand } from './../commands/impl/assign-task.handler';
import { TaskCreatedEvent } from './../events/impl/task-created.event';
import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from "rxjs";

@Injectable()
export class AssignTaskSaga {
  @Saga()
  TaskAssigned = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TaskCreatedEvent),
      map((event) => new AssignTaskCommand(event.id)),
    );
  }
}