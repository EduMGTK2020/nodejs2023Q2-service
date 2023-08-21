import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'login' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password: string;
}
