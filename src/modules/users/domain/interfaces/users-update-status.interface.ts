import { UsersUpdateStatusResponseDto } from '../../application/dtos/users-update-status-response.dto';

export interface IUsersUpdateStatus {
  updateStatus(
    id: string,
    status: boolean,
  ): Promise<UsersUpdateStatusResponseDto>;
}
