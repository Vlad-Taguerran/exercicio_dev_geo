export class UserGetDto {
  id: string;
  name: string;
  email: string;

  constructor(id:string,name: string, email: string,) {
    this.name = name;
    this.email = email;
    this.id = id
  }
}