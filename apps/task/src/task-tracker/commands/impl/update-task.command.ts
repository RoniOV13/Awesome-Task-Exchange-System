import { UpdateTaskDto } from "src/task-tracker/dto/update-task.dto";

export class UpdateTaskCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateTaskDto,
  ) { }
}
