import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
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

  async changeRole(id: string, role: string) {
    const result = await this.model.findOne({ id: id });
    result.role = role;
    return result.save();
  }

  async findAll(query: any) {
    const shops = await this.model.find(query);
    return shops;
  }

  async findOne(id: string) {
    const shop = await this.model.findOne({ id: id });
    if (shop) {
      return shop;
    } else {
      throw new NotFoundException('Нет Магазина');
    }
  }

  async update(id: string, createUserdto: CreateUserDto) {
    return await this.model.findOneAndUpdate(
      { id: id },
      { $set: createUserdto },
    );
  }
}
