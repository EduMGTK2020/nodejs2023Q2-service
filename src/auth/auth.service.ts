import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { stripPassword } from 'src/user/user.controller';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(credentials: CreateUserDto) {
    return stripPassword(await this.userService.create(credentials));
  }

  async login(login: string, userId: string) {
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

  async refresh(refreshToken: string) {
    const result = this.jwtService.verify(refreshToken);
    return await this.userService.findByLogin(result.login);
  }

  async isPasswordValid(pass: string, hash: string) {
    return await bcrypt.compare(pass, hash);
  }
}
