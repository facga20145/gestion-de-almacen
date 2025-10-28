import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorResponses,
  ApiSuccessResponse,
} from 'src/utils/decorators/api-swagger.decorator';

// Use cases
import { SuppliersCreateUseCase } from '../../application/use-cases/commands/suppliers-create.use-case';
import { SuppliersUpdateUseCase } from '../../application/use-cases/commands/suppliers-update.use-case';
import { SuppliersDeleteUseCase } from '../../application/use-cases/commands/suppliers-delete.use-case';
import { SuppliersFindOneUseCase } from '../../application/use-cases/queries/suppliers-find-one.use-case';
import { SuppliersFindAllUseCase } from '../../application/use-cases/queries/suppliers-find-all.use-case';

// DTOs
import { SuppliersCreateRequestDto } from '../../application/dtos/suppliers-create-request.dto';
import { SuppliersCreateResponseDto } from '../../application/dtos/suppliers-create-response.dto';
import { SuppliersUpdateRequestDto } from '../../application/dtos/suppliers-update-request.dto';
import { SuppliersUpdateResponseDto } from '../../application/dtos/suppliers-update-response.dto';

import { CustomResponseInterceptor } from 'src/utils/interceptors/customresponse.interceptor';

@ApiTags('Suppliers')
@UseInterceptors(CustomResponseInterceptor)
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly createUseCase: SuppliersCreateUseCase,
    private readonly updateUseCase: SuppliersUpdateUseCase,
    private readonly deleteUseCase: SuppliersDeleteUseCase,
    private readonly findOneUseCase: SuppliersFindOneUseCase,
    private readonly findAllUseCase: SuppliersFindAllUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nuevo proveedor',
    description: 'Permite crear un nuevo proveedor de repuestos',
  })
  @ApiSuccessResponse(
    HttpStatus.CREATED,
    'Proveedor creado correctamente',
    SuppliersCreateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.CONFLICT,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async create(@Body() request: SuppliersCreateRequestDto) {
    return await this.createUseCase.run(request);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener proveedor por ID',
    description: 'Permite obtener un proveedor específico con sus productos',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Proveedor encontrado correctamente',
    SuppliersCreateResponseDto,
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
    summary: 'Listar proveedores',
    description: 'Permite obtener una lista paginada de proveedores',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Proveedores encontrados correctamente',
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
    summary: 'Actualizar proveedor',
    description: 'Permite actualizar un proveedor existente',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Proveedor actualizado correctamente',
    SuppliersUpdateResponseDto,
  )
  @ApiErrorResponses(
    HttpStatus.BAD_REQUEST,
    HttpStatus.NOT_FOUND,
    HttpStatus.CONFLICT,
    HttpStatus.INTERNAL_SERVER_ERROR,
  )
  async update(@Param('id') id: string, @Body() request: SuppliersUpdateRequestDto) {
    return await this.updateUseCase.run(parseInt(id), request);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar proveedor',
    description: 'Permite eliminar un proveedor (soft delete) si no tiene productos activos',
  })
  @ApiSuccessResponse(
    HttpStatus.OK,
    'Proveedor eliminado correctamente',
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