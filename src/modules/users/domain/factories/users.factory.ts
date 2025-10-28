import { UsersEntity } from '../entities/users.entity';

export class UsersFactory {
  static createFromPrisma(data: any): UsersEntity {
    return {
      id: data.id,
      username: data.username,
      password: data.password,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
