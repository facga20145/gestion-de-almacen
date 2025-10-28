import { Injectable, Inject } from '@nestjs/common';
import { ProfilesRepositoryPort } from 'src/modules/profiles/infrastructure/adapters/ports/profiles-repository.port';

export interface IProfilesDelete {
  delete(id: string): Promise<void>;
}

@Injectable()
export class ProfilesDeleteService implements IProfilesDelete {
  constructor(
    @Inject('ProfilesRepository')
    private repo: ProfilesRepositoryPort,
  ) {}

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}