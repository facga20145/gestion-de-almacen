import { Injectable, Inject } from '@nestjs/common';
import { ProfilesCreateResponseDto } from 'src/modules/profiles/application/dtos/profiles-create-response.dto';
import { ProfilesRepositoryPort } from 'src/modules/profiles/infrastructure/adapters/ports/profiles-repository.port';

export interface IProfilesFindOne {
  findOne(id: string): Promise<ProfilesCreateResponseDto>;
}

@Injectable()
export class ProfilesFindOneService implements IProfilesFindOne {
  constructor(
    @Inject('ProfilesRepository')
    private repo: ProfilesRepositoryPort,
  ) {}

  async findOne(id: string): Promise<ProfilesCreateResponseDto> {
    return this.repo.findOne(id);
  }
}