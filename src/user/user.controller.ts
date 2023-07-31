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
  findAll() {
    return this.userService.findAll();
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
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
