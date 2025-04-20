import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { store, userAction } from "../Redux/store";
import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";
import { errorHandler } from "../Utils/ErrorHandler";
import { authService } from "./AuthService";

class UserService {
  public constructor() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const container = jwtDecode<UserModel>(token);
      const dbUser = container;
      const action = userAction.initUser(dbUser);
      store.dispatch(action);
    } catch (error: any) {
      console.log(errorHandler.getError(error));
    }
  }

  public async register(user: UserModel) {
    try {
      const response = await axios.post<string>(appConfig.register, user);
      const token = response.data;

      localStorage.setItem("token", token);

      const container = jwtDecode<UserModel>(token);
      const dbUser = container;

      const action = userAction.initUser(dbUser);
      store.dispatch(action);
    } catch (error: any) {
      console.log(errorHandler.getError(error));
    }
  }

  public async login(credentials: CredentialsModel) {
    try {
      const response = await axios.post<string>(appConfig.login, credentials);
      const token = response.data;
      console.log("Token:", token);

      localStorage.setItem("token", token);

      const container = jwtDecode<UserModel>(token);
      console.log("Decoded Token:", container);
      const dbUser = container;

      console.log(dbUser);

      const isAdmin = dbUser.roleId === "1"; // Adjust based on your role ID format
      console.log("Is Admin:", isAdmin);

      const action = userAction.initUser(dbUser);
      store.dispatch(action);
    } catch (error: any) {
      const errorMessage = errorHandler.getError(error);
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  public logout() {
    localStorage.removeItem("token");
    const action = userAction.logoutUser();
    store.dispatch(action);
  }

  //check if its works!
  public logoutWhenTokenIsExpired() {
    const token = authService.getToken();
    const checkToken = authService.isLoggedIn(token);

    if (!checkToken) {
      this.logout();
      window.location.href = "/login";
    }
  }
}

export const userService = new UserService();
