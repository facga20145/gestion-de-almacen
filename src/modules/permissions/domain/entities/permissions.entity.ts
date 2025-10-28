// src/domain/entities/permissions.entity.ts
export class Permission {
  constructor(
    public id: string,
    public name: string,
    public flag: string,
    public status: boolean = true
  ) {}
}
