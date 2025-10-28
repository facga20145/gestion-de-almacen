import { Injectable } from '@nestjs/common';
import { UsersPaginatedRequestDto } from 'src/modules/users/application/dtos/users-paginated-request.dto';
import { UsersPaginatedResponseDto } from '../../dtos/users-paginated-response.dto';
import { UsersFindPaginatedService } from 'src/modules/users/domain/services/queries/users-find-paginated.service';

@Injectable()
export class UsersFindPaginatedUseCase {
  constructor(
    private readonly usersFindPaginatedService: UsersFindPaginatedService,
  ) {}
  async execute(
    dto: UsersPaginatedRequestDto,
  ): Promise<UsersPaginatedResponseDto> {
    return this.usersFindPaginatedService.findPaginated(dto);
  }
}
