import { IUserModel } from "./user-model";

export class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(user: CredentialsModel) {
    this.email = user.email;
    this.password = user.password;
  }
}
