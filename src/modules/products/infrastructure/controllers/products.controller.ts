import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';

// Use cases
import { ProductsCreateUseCase } from '../../application/use-cases/commands/products-create.use-case';
import { ProductsUpdateUseCase } from '../../application/use-cases/commands/products-update.use-case';
import { ProductsDeleteUseCase } from '../../application/use-cases/commands/products-delete.use-case';
import { ProductsFindOneUseCase } from '../../application/use-cases/queries/products-find-one.use-case';
import { ProductsFindAllUseCase } from '../../application/use-cases/queries/products-find-all.use-case';

// DTOs
import { ProductsCreateRequestDto } from '../../application/dtos/products-create-request.dto';
import { ProductsCreateResponseDto } from '../../application/dtos/products-create-response.dto';
import { ProductsUpdateRequestDto } from '../../application/dtos/products-update-request.dto';
import { ProductsUpdateResponseDto } from '../../application/dtos/products-update-response.dto';

import { CustomResponseInterceptor } from 'src/utils/interceptors/customresponse.interceptor';

@ApiTags('Products')
@UseInterceptors(CustomResponseInterceptor)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly createUseCase: ProductsCreateUseCase,
    private readonly updateUseCase: ProductsUpdateUseCase,
    private readonly deleteUseCase: ProductsDeleteUseCase,
    private readonly findOneUseCase: ProductsFindOneUseCase,
    private readonly findAllUseCase: ProductsFindAllUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo producto',
    description: 'Permite crear un nuevo producto/repuesto',
  })
  @ApiSuccessResponse(
    HttpStatus.CREATED,
    'Producto creado correctamente',
    ProductsCreateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.CONFLICT,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async create(@Body() request: ProductsCreateRequestDto) {
    return await this.createUseCase.run(request);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener producto por ID',
    description: 'Permite obtener un producto específico por su ID',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Producto encontrado correctamente',
    ProductsCreateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async findOne(@Param('id') id: string) {
    return await this.findOneUseCase.run(parseInt(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Listar productos',
    description: 'Permite obtener una lista paginada de productos',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Productos encontrados correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async findAll(@Query() params: any) {
    return await this.findAllUseCase.run(params);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar producto',
    description: 'Permite actualizar un producto existente',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Producto actualizado correctamente',
    ProductsUpdateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.CONFLICT,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async update(@Param('id') id: string, @Body() request: ProductsUpdateRequestDto) {
    return await this.updateUseCase.run(parseInt(id), request);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar producto',
    description: 'Permite eliminar un producto (soft delete)',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Producto eliminado correctamente',
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async delete(@Param('id') id: string) {
    return await this.deleteUseCase.run(parseInt(id));
  }
}