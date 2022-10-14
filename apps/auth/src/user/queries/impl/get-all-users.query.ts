export class GetAllUsersQuery {
    constructor(
      public readonly query: any = {},
      readonly select: Record<string, 0 | 1>,
      public readonly params: any = {}
    ) { }
  }
  