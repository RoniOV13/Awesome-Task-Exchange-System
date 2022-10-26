import {  Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeRoleDto } from './dto/change-role.dto';
import { CreateUserDto } from './dto/user.dto';
import { UserSchema } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  readonly #logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema>,
  ) {}

  async create(document: CreateUserDto) {
    const result = await new this.model(document).save();
    return result;
  }

  async findAll(query: any) {
    const users = await this.model.find(query);
    return users;
  }

  async findOne(id: string) {
    const user = await this.model.findOne({ id: id });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('Нет пользователя');
    }
  }

  async changeRole(changeRoleDto: ChangeRoleDto) {
    const result = await this.model.findOne({ id: changeRoleDto.id });
    result.role = changeRoleDto.role;
    return result.save();
  }

  async update(updateUser: any) {
    return await this.model.findOneAndUpdate(
      { id: updateUser.id },
      { $set: updateUser },
    );
  }
}
