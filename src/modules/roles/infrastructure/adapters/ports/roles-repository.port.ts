import { RolesCreateRequestDto } from "src/modules/roles/application/dtos/roles-create-request.dto";
import { RolesCreateResponseDto } from "src/modules/roles/application/dtos/roles-create-response.dto";

export abstract class RolesRepositoryPort {
  abstract create(data: RolesCreateRequestDto): Promise<RolesCreateResponseDto>;
}