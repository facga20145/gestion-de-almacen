import { Inject, Injectable } from '@nestjs/common';
import { ProfilesUpdateService } from '../../../domain/services/commands/profiles-update.service';
import { ProfilesUpdateRequestDto } from '../../dtos/profiles-update-request.dto';
import { ProfilesUpdateResponseDto } from '../../dtos/profiles-update-response.dto';

@Injectable()
export class ProfilesUpdateUseCase {
  
    constructor(
      @Inject('IProfilesUpdate') private service: ProfilesUpdateService,
    ) {}
  

  async execute(id: string, request: ProfilesUpdateRequestDto): Promise<ProfilesUpdateResponseDto> {
    return this.service.update(id, request);
  }
}