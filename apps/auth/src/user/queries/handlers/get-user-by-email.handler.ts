import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserSchema } from 'src/user/schemas/user.schema';
import { GetUserByEmailQuery } from '../impl/get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
    private readonly repository: UserRepository,
  ) {}

  async execute({ email }: GetUserByEmailQuery) {
    const user = await this.model.findOne({ email });
    if (!user) return null
    return await this.repository.findOneById(user.id);
  }
}
