import { UsersFindOneResponseDto } from 'src/modules/users/application/dtos/users-find-one-response.dto';
import { UsersPaginatedRequestDto } from 'src/modules/users/application/dtos/users-paginated-request.dto';
import { UsersPaginatedResponseDto } from 'src/modules/users/application/dtos/users-paginated-response.dto';
import { UsersUpdateStatusResponseDto } from 'src/modules/users/application/dtos/users-update-status-response.dto';

export abstract class UsersRepositoryPort {
 

  abstract findOne(id: string): Promise<UsersFindOneResponseDto>;

  abstract updateStatus(
    id: string,
    status: boolean,
  ): Promise<UsersUpdateStatusResponseDto>;

  abstract findPaginated(
    dto: UsersPaginatedRequestDto,
  ): Promise<UsersPaginatedResponseDto>;
}
