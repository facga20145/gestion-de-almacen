import { AuthEntity } from '../entities/auth.entity';


export class AuthFactory {
  static createFromPrisma(data: any): AuthEntity {
    return new AuthEntity(
      data.id,
      data.username,
      data.password,
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }
}
