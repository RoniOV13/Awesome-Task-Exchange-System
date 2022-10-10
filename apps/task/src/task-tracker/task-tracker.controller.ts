import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskCommand } from './commands/impl/create-task.handler';
import { UpdateTaskCommand } from './commands/impl/update-task.command';
import { CompleteTaskCommand } from './commands/impl/complete-task.handler';
import { ReassignUserCommand } from './commands/impl/reassign-user.command';
import { GetTasksQuery } from './queries/impl/get-all-task.query';
import { QueryOptions } from 'mongoose';
import usePagination from 'src/helpers/usePagination';
import useSort from 'src/helpers/useSort';
import useQuery from 'src/helpers/useQuery';
import { GetTaskByIdQuery } from './queries/impl/get-task-by-id.query';

@ApiTags('Task-Tracker')
@Controller('task-tracker')
export class TaskTrackerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.commandBus.execute(new CreateTaskCommand(createTaskDto));
  }

  @Post('/complete-task/:id')
  async completeTask(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commandBus.execute(new CompleteTaskCommand(id));
  }

  @Get('')
  @ApiQuery({ name: '_skip', type: 'string', required: false })
  @ApiQuery({ name: '_limit', type: 'string', required: false })
  @ApiQuery({ name: '_sort', type: 'string', required: false })
  async findAll(
    @Query('_limit') limit: string | null = null,
    @Query('_sort') sort: string | null = null,
    @Query('_skip') skip: string | null = null,
    @Query() query: string | null = null,
  ) {
    const params: QueryOptions = {
      sort: {
        createdAt: 1,
      },
    };
    if (limit || skip) {
      const { skip: _skip, limit: _limit } = usePagination(skip, limit);
      params['skip'] = _skip;
      params['limit'] = _limit;
    }
    params.sort = useSort(sort);

    return this.queryBus.execute(new GetTasksQuery(query, null, params));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetTaskByIdQuery(id));
  }

  @Post('/reassign/:id')
  async reassign(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commandBus.execute(new ReassignUserCommand(id));
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.commandBus.execute(new UpdateTaskCommand(id, updateTaskDto));
  }
}
