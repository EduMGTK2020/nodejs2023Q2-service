import { Controller, Post, HttpCode, Request, Body } from '@nestjs/common';
import {
  // ApiBadRequestResponse,
  // ApiCreatedResponse,
  ApiTags,
  // ApiOperation,
  // ApiOkResponse,
  // ApiParam,
  // ApiNotFoundResponse,
  // ApiNoContentResponse,
  // ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from './auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() createUserDto: CreateUserDto) {
    return await this.authService.login(createUserDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req) {
    return await this.authService.refresh(req.body);
  }
}
