import crypto from "crypto";
import jwt, { SignOptions } from "jsonwebtoken";
import { IUserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";

class Cyber {
  private secretKey = "TheAmazing4578-99Students!";

  private hashingSalt = "MakeThingsGoRight!!!";

  public hash(plainText: string): string {
    return crypto
      .createHmac("SHA-512", this.hashingSalt)
      .update(plainText)
      .digest("hex");
  }

  public generateNewToken(user: IUserModel): string {
    // Deep clone the user object to avoid modifying the original
    const userCopy = JSON.parse(JSON.stringify(user));

    // Remove sensitive fields
    delete userCopy.password;

    const option: SignOptions = { expiresIn: "3h" };

    const token = jwt.sign(userCopy, this.secretKey, option);

    console.log("Token Payload:", jwt.decode(token));

    return token;
  }

  public isTokenValid(token: string): boolean {
    try {
      if (!token) return false;

      jwt.verify(token, this.secretKey);

      return true;
    } catch (error: any) {
      return false;
    }
  }

  public isAdmin(token: string): boolean {
    try {
      const container = jwt.decode(token) as IUserModel;

      const user = container;

      return user.roleId === Role.Admin;
    } catch (error: any) {
      return false;
    }
  }
}

export const cyber = new Cyber();
