import { jwtDecode } from "jwt-decode";
import { errorHandler } from "../Utils/ErrorHandler";
import { UserModel } from "../Models/UserModel";
import { Role } from "../Models/Enums";

class AuthService {
  public isLoggedIn(token: string): boolean {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;

      const SECONDS_IN_MILLISECOND = 1000;
      const currentTime = Date.now() / SECONDS_IN_MILLISECOND;
      return decoded.exp > currentTime;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return false;
    }
  }

  public getToken(): string {
    try {
      const token = localStorage.getItem("token");

      return token || "";
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return "";
    }
  }

  public isAdmin(): boolean {
    try {
      const token = this.getToken();

      if (!token) return false;

      const isLoggedIn = this.isLoggedIn(token);

      if (!isLoggedIn) return false;

      const decoded = jwtDecode<UserModel>(token);

      return decoded.roleId === Role.Admin;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return false;
    }
  }
}

export const authService = new AuthService();
