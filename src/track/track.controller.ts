import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
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
  ApiBearerAuth,
} from '@nestjs/swagger';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@ApiBearerAuth()
@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({
    summary: 'get all tracks',
  })
  @ApiOkResponse({
    description: 'Tracks successfully getted',
    type: [Track],
  })
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get single track by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of track',
    type: 'string',
  })
  @ApiOkResponse({
    description: 'Track successfully getted',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Track id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({
    description: 'Track with given id not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  @Post()
  @ApiOperation({
    summary: 'create new track',
  })
  @ApiBody({
    type: CreateTrackDto,
    description: 'Data for new track',
  })
  @ApiCreatedResponse({
    description: 'Track successfully created',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'update album track',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of track',
    type: 'string',
  })
  @ApiBody({
    type: UpdateTrackDto,
    description: 'Data for update album',
  })
  @ApiOkResponse({
    description: 'Track successfully updated',
    type: Track,
  })
  @ApiBadRequestResponse({
    description: 'Track id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Track with given id not found' })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete track',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of track',
    type: 'string',
  })
  @ApiNoContentResponse({
    description: 'Track successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Track id is invalid (not UUID)',
  })
  @ApiNotFoundResponse({ description: 'Track with given id not found' })
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return await this.trackService.remove(id);
  }
}
