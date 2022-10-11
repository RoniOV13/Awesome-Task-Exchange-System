import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: '076db842-98e6-4607-af9c-1b8469302f3d',
    format: 'string',
  })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'test',
    description: 'username',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly username: string;

  @ApiProperty({
    example: 'manager',
    format: 'string',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
