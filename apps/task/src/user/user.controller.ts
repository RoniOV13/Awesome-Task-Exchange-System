import {
  Controller,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

type CREATE_USER = {
  id: string;
  username: string;
  role: string;
};

@Controller({
  path: 'user',
})
export class UserController {
  constructor(private readonly service: UserService) {}

  @MessagePattern('user.created')
  async createUser(@Payload() createUser: CREATE_USER) {
    console.log('createUser', createUser)
    return await this.service.create(createUser);
  }

  @MessagePattern('user.changed-role')
  async changeRole(@Payload() changeRole: any) {
    console.log('message', changeRole)
    await this.service.changeRole(changeRole.id, changeRole.role);
  }

  @MessagePattern('user.updated')
  async updateShopUsers(@Payload() updateUser: CREATE_USER): Promise<void> {
    await this.service.update(updateUser);
  }
}
