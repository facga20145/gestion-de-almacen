import { Inject, Injectable } from '@nestjs/common';
import { ProfilesRepositoryImpl } from 'src/modules/profiles/infrastructure/adapters/implements/profiles-repository.impl';
import { ProfilesUpdateRequestDto } from 'src/modules/profiles/application/dtos/profiles-update-request.dto';
import { ProfilesUpdateResponseDto } from 'src/modules/profiles/application/dtos/profiles-update-response.dto';
import { ProfilesRepositoryPort } from 'src/modules/profiles/infrastructure/adapters/ports/profiles-repository.port';

@Injectable()
export class ProfilesUpdateService {
  constructor(
    @Inject('ProfilesRepository')
    private repo: ProfilesRepositoryPort,
  ) {}

  update(
    id: string,
    request: ProfilesUpdateRequestDto,
  ): Promise<ProfilesUpdateResponseDto> {
    return this.repo.update(id, request);
  }
}
