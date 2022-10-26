import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'test',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({
    example: 'popug-24',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  readonly jiraId: string;

  @ApiProperty({
    example: 'test',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly description: string;
}
