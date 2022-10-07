export class GetTasksQuery {
    constructor(
      readonly query: unknown,
      readonly select: Record<string, 0 | 1>,
      readonly params: unknown
    ) {}
  }