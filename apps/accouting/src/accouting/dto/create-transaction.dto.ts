import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { REASON_TYPES } from '../constants';

export class CreateTransactionDto {
  @ApiProperty({
    example: '076db842-98e6-4607-af9c-1b8469302f3d',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 250,
    format: 'number',
  })
  @IsString()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: '076db842-98e6-4607-af9c-1b8469302f3d',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  taskId: string;

  @ApiProperty({
    example: 'task-assigneed',
    format: 'string',
  })
  @IsString()
  @IsNotEmpty()
  reason: REASON_TYPES;
}
