import { RolesCreateRequestDto } from "../../application/dtos/roles-create-request.dto";
import { RolesCreateResponseDto } from "../../application/dtos/roles-create-response.dto";

export interface IRolesCreate {
  create(data: RolesCreateRequestDto): Promise<RolesCreateResponseDto>;
}