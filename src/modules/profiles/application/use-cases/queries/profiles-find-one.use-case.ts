import { Inject, Injectable } from '@nestjs/common';
import { ProfilesFindOneService } from '../../../domain/services/queries/profiles-find-one.service';
import { ProfilesCreateResponseDto } from '../../dtos/profiles-create-response.dto';

@Injectable()
export class ProfilesFindOneUseCase {
  constructor(
      @Inject('IProfilesFindOne') private service: ProfilesFindOneService,
    ) {}

  async execute(id: string): Promise<ProfilesCreateResponseDto> {
    return this.service.findOne(id);
  }
}