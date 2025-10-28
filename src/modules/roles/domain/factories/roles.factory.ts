import { RolesEntity } from "../entities/roles.entity";

export class RolesFactory {
  static createFromPrisma(data: any): RolesEntity {
    return {
      id: data.id,
      name: data.name,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
