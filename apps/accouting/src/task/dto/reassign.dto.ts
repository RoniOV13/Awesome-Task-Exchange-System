import {
    IsString,
    IsUUID,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class ReassignDto {
    @ApiProperty({
      example: '076db842-98e6-4607-af9c-1b8469302f3d',
      format: 'string',
    })
    @IsString()
    @IsUUID()
    taskId: string;
  
    @ApiProperty({
      example: '076db842-98e6-4607-af9c-1b8469302f3d',
      format: 'string',
    })
    @IsString()
    @IsUUID()
    readonly assignee: string;
  }
  