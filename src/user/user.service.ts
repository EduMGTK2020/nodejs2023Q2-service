import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

const stripPassword = (user: User) => {
  const clone = Object.assign({}, user);
  delete clone.password;
  return clone;
};

@Injectable()
export class UserService {
  private Users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.Users.push(newUser);

    return stripPassword(newUser);
  }

  findAll() {
    const allUsers = this.Users.map((user) => {
      return stripPassword(user);
    });
    return allUsers;
  }

  findOne(id: string) {
    const user = this.Users.find((user) => user.id === id);
    if (user) {
      return stripPassword(user);
    }
    return user;
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const user = this.Users.find((user) => user.id === id);
    if (user) {
      console.log(user, updateUserDto.oldPassword);
      if (user.password !== updateUserDto.oldPassword) {
        throw new ForbiddenException(
          `Old password is wrong for user with id ${id}`,
        );
      }
      user.password = updateUserDto.newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
      return stripPassword(user);
    }
    return user;
  }

  remove(id: string) {
    const indexUser = this.Users.findIndex((user) => user.id === id);
    if (indexUser == -1) {
      throw new NotFoundException({
        message: `User with id ${id} is not found`,
      });
    }
    this.Users.splice(indexUser, 1);
    return;
  }
}
