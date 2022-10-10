import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsString,
    IsUUID,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class ChangeRoleDto {
    @ApiProperty({
      example: '076db842-98e6-4607-af9c-1b8469302f3d',
      format: 'string',
    })
    @IsString()
    @IsUUID()
    id: string;
    
    @ApiProperty({
      example: 'manager',
      format: 'string',
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly role: string;
  }
  