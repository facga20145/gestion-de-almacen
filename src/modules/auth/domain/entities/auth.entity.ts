
export class AuthEntity {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public status: boolean,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}