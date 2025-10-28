import { Injectable, Inject } from '@nestjs/common';
import { IUsersFindOne } from '../../interfaces/users-find-one.interface';
import { UsersFindOneResponseDto } from 'src/modules/users/application/dtos/users-find-one-response.dto';
import { UsersRepositoryPort } from 'src/modules/users/infrastructure/adapters/ports/users-repository.port';

@Injectable()
export class UsersFindOneService implements IUsersFindOne {
  constructor(
    @Inject('UsersRepositoryPort')
    private repo: UsersRepositoryPort,
  ) {}

  findOne(id: string): Promise<UsersFindOneResponseDto> {
    return this.repo.findOne(id);
  }
}
