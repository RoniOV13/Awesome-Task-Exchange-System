import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateUserDto {
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
      example: 'test@yandex.ru',
      description: 'The email of the User',
      format: 'email',
      uniqueItems: true,
      minLength: 5,
      maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;
  
    
    @ApiProperty({
      example: 'secret password change me!',
      description: 'The password of the User',
      format: 'string',
      minLength: 5,
      maxLength: 1024,
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
  }
  
  