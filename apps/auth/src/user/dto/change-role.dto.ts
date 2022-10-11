import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class changeRoleDto {
    @ApiProperty({
      example: '9da2d0be-d695-44cc-84e4-141eb19ae03e',
      format: 'string',
      minLength: 1,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;


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
  
  