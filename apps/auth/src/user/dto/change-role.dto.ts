import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class changeRoleDto {
    @ApiProperty({
      example: 'admin',
      format: 'string',
      minLength: 1,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    readonly userId: string;


    @ApiProperty({
      example: 'admin',
      format: 'string',
      minLength: 1,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    readonly role: string;
  }
  
  