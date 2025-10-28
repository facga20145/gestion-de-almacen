export class SuppliersEntity {
  constructor(
    public id: number,
    public nombre: string,
    public telefono: string | null,
    public email: string | null,
    public direccion: string | null,
    public activo: boolean,
    public fechaRegistro: Date,
    public updatedAt: Date,
    public createdAt: Date,
  ) {}
}