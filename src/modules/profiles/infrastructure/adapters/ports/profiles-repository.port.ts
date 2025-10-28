import { ProfilesCreateRequestDto } from 'src/modules/profiles/application/dtos/profiles-create-request.dto';
import { ProfilesCreateResponseDto } from 'src/modules/profiles/application/dtos/profiles-create-response.dto';
import { ProfilesUpdateRequestDto } from 'src/modules/profiles/application/dtos/profiles-update-request.dto';
import { ProfilesUpdateResponseDto } from 'src/modules/profiles/application/dtos/profiles-update-response.dto';
import { ProfilesPaginatedResponseDto } from 'src/modules/profiles/application/dtos/profiles-paginated-response.dto';

export abstract class ProfilesRepositoryPort {
  abstract create(request: ProfilesCreateRequestDto): Promise<ProfilesCreateResponseDto>;
  abstract findAll(): Promise<ProfilesCreateResponseDto[]>;
  abstract findOne(id: string): Promise<ProfilesCreateResponseDto>;
  abstract findPaginated(params: { index: number; limit: number; search?: string }): Promise<ProfilesPaginatedResponseDto>;
  abstract update(id: string, request: ProfilesUpdateRequestDto): Promise<ProfilesUpdateResponseDto>;
  abstract updateStatus(id: string, status: boolean): Promise<ProfilesUpdateResponseDto>;
  abstract delete(id: string): Promise<void>;
}