import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    example: '076db842-98e6-4607-af9c-1b8469302f3d',
    format: 'string',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'test',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({
    example: 'ub-24',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly jiraId: string;

  @ApiProperty({
    example: '076db842-98e6-4607-af9c-1b8469302f3d',
    format: 'string',
  })
  @IsString()
  @IsUUID()
  readonly assignee: string;
}
