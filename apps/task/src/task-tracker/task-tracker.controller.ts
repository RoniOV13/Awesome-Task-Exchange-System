// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Put,
//   Param,
//   UseGuards,
//   Delete,
// } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
// import { RolesGuard } from 'src/common/guards/roles.guard';
// import { GetAllUsersQuery } from './queries/impl/get-all-users.query';
// import { GetUserByIdQuery } from './queries/impl/get-user-by-id.query';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { CreateUserCommand } from './commands/impl/create-user.command';
// import { UpdateUserCommand } from './commands/impl/update-user.command';
// import { ChangeRoleCommand } from './commands/impl/change-role.command';
// import { ApiTags } from '@nestjs/swagger';
// import { CreateTaskDto } from './dto/create-task.dto';

// // @UseGuards(RolesGuard)
// @ApiTags('Task-Tracker')
// @Controller('task-tracker')
// export class UserController {
//   constructor(
//     private readonly commandBus: CommandBus,
//     private readonly queryBus: QueryBus,
//   ) {}

//   @Post('create-task')
//   async create(@Body() createTaskDto: CreateTaskDto) {
//     console.log('create-user')
//     // return this.commandBus.execute(new CreateUserCommand(createUserDto));
//   }

//   @Put(':id')
//   updateUser(
//     @Param('id') id: string,
//     @Body() updateUserDto: UpdateUserDto,
//   ): Promise<any> {
//     return this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
//   }
// }
