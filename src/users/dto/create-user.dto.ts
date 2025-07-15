export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  plan?: string;
  accepted_terms: boolean;
  idPerfil: number;
}
