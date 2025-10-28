// src/modules/permissions/infrastructure/controllers/permissions.controller.ts
import { Controller, Post, Body, Get, Param, Query, Put, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class PermissionsCreateDto { name: string; flag: string; }
class UpdatePermissionDto { name?: string; flag?: string; }
class UpdateStatusDto { active: boolean; }
class AssignPermissionsDto { permissionIds: string[]; }

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo permiso',
  description: 'Crea un nuevo permiso con la información proporcionada.',
})
  @ApiResponse({ status: 201, description: 'Permission created' })
  async create(@Body() createDto: PermissionsCreateDto) {
    return { id: '1234-uuid', ...createDto, active: true };
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({ status: 200, description: 'List of permissions' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return [
      { id: 'uuid-1', name: 'CREATE_USER', flag: 'create_user', active: true },
      { id: 'uuid-2', name: 'DELETE_USER', flag: 'delete_user', active: false },
    ];
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get paginated permissions' })
  async findPaginated(@Query('page') page = 1, @Query('limit') limit = 10) {
    return { page, limit, data: [], total: 0 };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a permission by ID' })
  @ApiResponse({ status: 200, description: 'Permission updated' })
  async update(@Param('id') id: string, @Body() updateDto: UpdatePermissionDto) {
    return { id, ...updateDto, active: true };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update permission status' })
  async updateStatus(@Param('id') id: string, @Body() statusDto: UpdateStatusDto) {
    return { id, active: statusDto.active };
  }

  @Post('profiles/:profileId/permissions')
  @ApiOperation({ summary: 'Assign permissions to a profile' })
  async assignToProfile(@Param('profileId') profileId: string, @Body() assignDto: AssignPermissionsDto) {
    return { profileId, assignedPermissions: assignDto.permissionIds };
  }
}
