import { RolUsuario } from '@prisma/client';

export class UsersEntity {
    constructor(
        public id: number,
        public nombre: string,
        public email: string,
        public contraseña: string,
        public rol: RolUsuario,
        public activo: boolean,
        public fechaRegistro: Date,
        public updatedAt: Date,
        public createdAt: Date
    ){}
}