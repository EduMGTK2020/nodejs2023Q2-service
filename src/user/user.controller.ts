import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  ForbiddenException,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const stripPassword = (user: User) => {
  const clone = Object.assign({}, user);
  delete clone.password;
  return clone;
};

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'get all users',
  })
  @ApiOkResponse({
    description: 'Users successfully getted',
    type: [User],
  })
  async findAll() {
    const allUsers = await this.userService.findAll();
    return allUsers.map((user) => stripPassword(user));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single user by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of user',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'User successfully getted',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({
    description: 'User with given id not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return stripPassword(user);
  }

  @Post()
  @ApiOperation({
    summary: 'create user',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data for new user',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return stripPassword(await this.userService.create(createUserDto));
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update user password',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of user',
    type: 'string',
  })
  @ApiBody({
    type: UpdatePasswordDto,
    description: 'Data for update user',
  })
  @ApiOkResponse({
    description: 'User successfully updated',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'User with given id not found' })
  @ApiForbiddenResponse({ description: 'Old password is wrong' })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException({
        message: `User with id ${id} is not found`,
      });
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(
        `Old password is wrong for user with id ${id}`,
      );
    }
    const userUpd = await this.userService.update(id, updateUserDto);
    return stripPassword(userUpd);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete user',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of user',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'User successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'User id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'User with given id not found' })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException({
        message: `User with id ${id} is not found`,
      });
    }
    return await this.userService.remove(id);
  }
}
