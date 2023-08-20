import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async validateUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userService.findByLogin(createUserDto.login);

    if (!user) {
      throw new ForbiddenException(
        `User with login ${createUserDto.login} not exist`,
      );
    }

    const { login, id: userId } = user;
    const payload = { login, userId };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    return { accessToken, refreshToken };
  }

  async refresh({ refreshToken }) {
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token wasn't provided");
    }
    try {
      const result = this.jwtService.verify(refreshToken);
      const userToLogin = await this.userService.findByLogin(result.login);
      const userDto: CreateUserDto = {
        login: userToLogin.login,
        password: '',
      };
      return await this.login(userDto);
    } catch {
      throw new ForbiddenException('RefreshToken is invalid or expired');
    }
  }
}
