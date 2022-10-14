import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/user/repository/user.repository';
import { GetUserByIdQuery } from '../impl/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    private readonly repository: UserRepository,
  ) {}

  async execute(query: GetUserByIdQuery) {
    return this.repository.findOneById(query.id);
  }
}
