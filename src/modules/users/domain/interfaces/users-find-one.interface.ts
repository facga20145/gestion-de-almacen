import { UsersFindOneResponseDto } from '../../application/dtos/users-find-one-response.dto';

export interface IUsersFindOne {
  findOne(id: string): Promise<UsersFindOneResponseDto>;
}
