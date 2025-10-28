import { RolUsuario } from '@prisma/client';

export interface JwtPayload {
    username: string;
    email: string;
    roleId: RolUsuario;
    profileId: number;
}