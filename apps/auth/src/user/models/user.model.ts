import { AggregateRoot } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { UserUpdatedEvent } from '../events/impl/user-updated.event';
import { ChangedRoleEvent } from '../events/impl/change-role.event';
import { changeRoleDto } from '../dto/change-role.dto';

export class User extends AggregateRoot {
  public readonly id: string;

  public username: string;

  public email: string;

  public password: string;

  public role: string;

  public createdAt: string;

  public updatedAt: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  onUserCreatedEvent(event: UserCreatedEvent) {
    this.username = event.username;
    this.email = event.email;
    this.password = event.password;
    this.role = event.role,
    this.createdAt = event.createdAt;
    this.updatedAt = event.createdAt;
  }

  createUser(dto: CreateUserDto) {
    const createdAt = new Date(Date.now()).toISOString(),
      updatedAt = new Date(Date.now()).toISOString();

    this.apply(
      new UserCreatedEvent(
        this.id,
        dto.username,
        dto.email,
        dto.password,
        dto.role,
        createdAt,
        updatedAt,
      ),
    );
  }

  changeRole(dto: changeRoleDto) {
    const updatedAt = new Date(Date.now()).toISOString()
    
    this.apply(
      new ChangedRoleEvent(
        dto.id,
        dto.role,
        updatedAt
      ),
    );
  }

  updateUser(id: string, dto: UpdateUserDto) {
    const updatedAt = new Date(Date.now()).toISOString();

    this.apply(
      new UserUpdatedEvent(
        id,
        dto.username,
        dto.email,
        dto.password,
        updatedAt,
      ),
    );
  }
}
