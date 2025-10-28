import { Inject, Injectable } from '@nestjs/common';
import { UsersUpdateStatusService } from 'src/modules/users/domain/services/commands/users-update-status.service';
import { UsersUpdateStatusResponseDto } from 'src/modules/users/application/dtos/users-update-status-response.dto';

@Injectable()
export class UsersUpdateStatusUseCase {
  constructor(
    @Inject('IUsersUpdateStatus')
    private service: UsersUpdateStatusService,
  ) {}

  async execute(
    id: string,
    status: boolean,
  ): Promise<UsersUpdateStatusResponseDto> {
    return this.service.updateStatus(id, status);
  }
}
