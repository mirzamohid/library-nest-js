import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
