import { Inject, Injectable } from '@nestjs/common';
import { UsersPaginatedRequestDto } from 'src/modules/users/application/dtos/users-paginated-request.dto';
import { UsersPaginatedResponseDto } from 'src/modules/users/application/dtos/users-paginated-response.dto';
import { UsersRepositoryImpl } from 'src/modules/users/infrastructure/adapters/implements/users-repository.impl';

@Injectable()
export class UsersFindPaginatedService {
  constructor(
    @Inject(UsersRepositoryImpl)
    private repo: UsersRepositoryImpl,
  ) {}

  findPaginated(
    dto: UsersPaginatedRequestDto,
  ): Promise<UsersPaginatedResponseDto> {
    return this.repo.findPaginated(dto);
  }
}
