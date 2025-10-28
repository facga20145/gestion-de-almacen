export class RolesEntity {
  constructor(
    public id: string,
    public name: string,
    public status: boolean,
    public createdAt: Date,
    public updatedAt: Date | null,
  ) {}
}
