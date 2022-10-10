import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { GetAllUsersQuery } from '../impl/get-all-users.query';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @InjectModel('User')
    private readonly model: Model<User>,
  ) { }

  async execute(query: GetAllUsersQuery): Promise<any[]> {
    const defaultParams = {
      createdAt: -1
    }
    return await this.model.find(query.query, { _id: 0 }, { ...defaultParams, ...query.params });
  }
}
