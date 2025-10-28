import { Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryPort } from 'src/modules/users/infrastructure/adapters/ports/users-repository.port';
import { IUsersUpdateStatus } from '../../interfaces/users-update-status.interface';
import { UsersUpdateStatusResponseDto } from 'src/modules/users/application/dtos/users-update-status-response.dto';

@Injectable()
export class UsersUpdateStatusService implements IUsersUpdateStatus {
  constructor(
    @Inject('UsersRepositoryPort')
    private repo: UsersRepositoryPort,
  ) {}

  updateStatus(
    id: string,
    status: boolean,
  ): Promise<UsersUpdateStatusResponseDto> {
    return this.repo.updateStatus(id, status);
  }
}
