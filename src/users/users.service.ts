import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = (
      await this.userModel.findOne({ username: username })
    ).toObject();
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }
}
