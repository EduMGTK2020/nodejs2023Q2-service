import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUserDto: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newUser = this.usersRepository.create(newUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOneBy({ id });
    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    user.createdAt = Number(user.createdAt); // for typeorm
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
