import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import clc from 'cli-color';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/repository/user.repository';
import { GetUserByIdQuery } from '../impl/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectModel('User')
    private readonly model: Model<User>,
    private readonly repository: UserRepository,
  ) {}

  async execute(query: GetUserByIdQuery) {
    console.log(clc.yellowBright('Async GetUserByIdQuery...'));
    return this.repository.findOneById(query.id);
  }
}
