import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string; // new password
}
