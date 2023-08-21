import {
  Controller,
  Post,
  HttpCode,
  Request,
  Body,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiProperty,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from './auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

class RefreshTokenDto {
  @ApiProperty({ example: 'your_refresh_token_here' })
  public refreshToken: string;
}

class AccessRefreshTokensPairDto {
  @ApiProperty({ example: 'access_token_here' })
  public accesshToken: string;
  @ApiProperty({ example: 'refresh_token_here' })
  public refreshToken: string;
}

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @ApiOperation({
    summary: 'send login and password to create a new user',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: User,
  })
  @ApiBadRequestResponse({
    description:
      'Request body does not contain required fields or the fields are of the wrong type',
  })
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'send login and password to get Access token and Refresh token',
  })
  @ApiOkResponse({
    description: 'Access and refresh tokens successfully created',
    type: AccessRefreshTokensPairDto,
  })
  @ApiBadRequestResponse({
    description:
      'Request body does not contain required fields or the fields are of the wrong type',
  })
  @ApiForbiddenResponse({
    description: 'User with this login does not exist',
  })
  @HttpCode(200)
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findByLogin(createUserDto.login);

    if (!user) {
      throw new ForbiddenException(
        `User with login ${createUserDto.login} not exist`,
      );
    }

    if (
      !(await this.authService.isPasswordValid(
        createUserDto.password,
        user.password,
      ))
    ) {
      throw new ForbiddenException(`User password doesn't match actual one`);
    }

    return await this.authService.login(user.login, user.id);
  }

  @Public()
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Refresh token',
  })
  @ApiOperation({
    summary:
      'send refresh token in body as { refreshToken } to get new pair of Access token and Refresh token',
  })
  @ApiOkResponse({
    description: 'Access and refresh tokens successfully refreshed',
    type: AccessRefreshTokensPairDto,
  })
  @ApiUnauthorizedResponse({ description: "Refresh token wasn't provided" })
  @ApiForbiddenResponse({
    description: 'Refresh token is invalid or expired',
  })
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Request() req) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token wasn't provided");
    }
    try {
      const user = await this.authService.refresh(refreshToken);
      return await this.authService.login(user.login, user.id);
    } catch (err) {
      throw new ForbiddenException(
        'Refresh token is invalid or expired - ' + err.message,
      );
    }
  }
}
