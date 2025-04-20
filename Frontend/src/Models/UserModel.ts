import { Role } from "./Enums";

export class UserModel {
  constructor(
    public _id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roleId: Role
  ) {}
}
