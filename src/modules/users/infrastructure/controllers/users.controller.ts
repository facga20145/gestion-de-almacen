import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';
import {
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { UsersCreateResponseDto } from '../../application/dtos/users-create-response.dto';

import { UsersFindOneUseCase } from '../../application/use-cases/queries/users-find-one.use-case';
import { UsersFindOneResponseDto } from '../../application/dtos/users-find-one-response.dto';

import { UsersUpdateStatusUseCase } from '../../application/use-cases/commands/users-update-status.use-case';
import { UsersUpdateStatusResponseDto } from '../../application/dtos/users-update-status-response.dto';

import { User } from '@prisma/client';
import { CustomResponseInterceptor } from 'src/utils/interceptors/customresponse.interceptor';
import { getRandomValues } from 'crypto';
import { UsersPaginatedRequestDto } from '../../application/dtos/users-paginated-request.dto';
import { UsersPaginatedResponseDto } from '../../application/dtos/users-paginated-response.dto';
import { UsersFindPaginatedUseCase } from '../../application/use-cases/queries/users-find-paginated.use-case';
import { AuthGuard } from 'src/utils/guards/auth.guard';

@Controller('user')
@UseInterceptors(CustomResponseInterceptor)
export class UsersController {
  constructor(
    private readonly findOneUseCase: UsersFindOneUseCase,
    private readonly updateStatusUseCase: UsersUpdateStatusUseCase,
    private readonly findPaginatedUseCase: UsersFindPaginatedUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'List all users',
    description: 'Endpoint to get all users without pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
  })
  async findAll() {
    // Usar findPaginated con límite muy alto para obtener todos
    return this.findPaginatedUseCase.execute({ index: 1, limit: 1000 });
  }

  
  @Get('paginated')
  @ApiOperation({
    summary: 'List users with pagination',
    description: 'Endpoint to list all users with pagination support',
  })
  @ApiResponse({
    status: 200,
    description: 'Users found successfully',
    type: UsersPaginatedResponseDto,
  })
  @ApiQuery({
    name: 'index',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number (1-based)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'juan',
    description: 'Filter by username',
  })
  async findPaginated(@Query() query: UsersPaginatedRequestDto) {
    return this.findPaginatedUseCase.execute(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find a user by ID',
    description: 'Endpoint to find a user by their unique ID',
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: UsersFindOneResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UsersFindOneResponseDto> {
    return this.findOneUseCase.execute(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update user status',
    description: 'Endpoint to update user status active/inactive',
  })
  @ApiResponse({
    status: 200,
    description: 'User status updated succesfully',
    type: UsersUpdateStatusResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User not found',
  })
  async updateStatus(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body('status') status: boolean,
  ): Promise<UsersUpdateStatusResponseDto> {
    return this.updateStatusUseCase.execute(id, status);
  }
}
