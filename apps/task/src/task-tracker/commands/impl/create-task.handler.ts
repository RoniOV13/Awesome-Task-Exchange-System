import { CreateTaskDto } from "src/task-tracker/dto/create-task.dto";

export class CreateTaskCommand {
  constructor(
    public readonly dto: CreateTaskDto,
  ) { }
}
