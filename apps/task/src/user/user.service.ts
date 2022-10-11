import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto";
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository
  ) { }

  async create(document: CreateUserDto) {
    return await this.repository.create(document)
  }

  async changeRole(id:string, role: string) {
     await this.repository.changeRole(id, role)
  }

  async update(updateUserDto: CreateUserDto) {
    this.repository.update(updateUserDto.id, updateUserDto)
  }

}
