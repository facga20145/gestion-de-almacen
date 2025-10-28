import { Inject, Injectable } from '@nestjs/common';
import { ProfilesFindAllService } from '../../../domain/services/queries/profiles-find-all.service';
import { ProfilesCreateResponseDto } from '../../dtos/profiles-create-response.dto';

@Injectable()
export class ProfilesFindAllUseCase {
  constructor(
    @Inject('IProfilesFindAll') private service: ProfilesFindAllService,
  ) {}

  async execute(): Promise<ProfilesCreateResponseDto[]> {
    return this.service.findAll();
  }
}
