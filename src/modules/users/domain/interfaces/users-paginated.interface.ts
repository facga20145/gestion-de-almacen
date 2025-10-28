import { UsersPaginatedRequestDto } from '../../application/dtos/users-paginated-request.dto';
import { UsersPaginatedResponseDto } from '../../application/dtos/users-paginated-response.dto';

export interface IUsersFindPaginated {
  findPaginated(
    dto: UsersPaginatedRequestDto,
  ): Promise<UsersPaginatedResponseDto>;
}
