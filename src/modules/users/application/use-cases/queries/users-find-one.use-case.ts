import { Injectable, Inject } from '@nestjs/common';
import { UsersFindOneService } from 'src/modules/users/domain/services/queries/users-find-one.service';
import { UsersFindOneResponseDto } from '../../dtos/users-find-one-response.dto';

@Injectable()
export class UsersFindOneUseCase {
  constructor(@Inject('IUsersFindOne') private service: UsersFindOneService) {}

  async execute(id: string): Promise<UsersFindOneResponseDto> {
    return this.service.findOne(id);
  }
}
