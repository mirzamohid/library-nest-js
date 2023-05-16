import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(userDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersService.create(userDto);
      return user;
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException('Email has been used by a user');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
