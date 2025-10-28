import { Injectable, Inject } from '@nestjs/common';
import { IProfilesDelete } from '../../../domain/services/commands/profiles-delete.service';

@Injectable()
export class ProfilesDeleteUseCase {
  constructor(
    @Inject('IProfilesDelete')
    private readonly profilesDeleteService: IProfilesDelete,
  ) {}

  async execute(id: string): Promise<void> {
    return this.profilesDeleteService.delete(id);
  }
}