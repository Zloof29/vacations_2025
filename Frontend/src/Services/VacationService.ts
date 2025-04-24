import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { authService } from "./AuthService";
import { appConfig } from "../Utils/AppConfig";
import { store, vacationAction } from "../Redux/store";
import { errorHandler } from "../Utils/ErrorHandler";

class VacationService {
  private async validationToken(requireAdmin: boolean): Promise<boolean> {
    const token = authService.getToken();

    if (!token) return false;

    const isLoggedIn = authService.isLoggedIn(token);

    if (!isLoggedIn) return false;

    if (requireAdmin) {
      const isAdmin = authService.isAdmin();
      return isAdmin;
    }

    return true;
  }

  public async getAllVacations(
    userId: string
  ): Promise<VacationModel[] | null> {
    try {
      const isValidateToken = await this.validationToken(false);

      if (!isValidateToken) return null;

      const response = await axios.get<VacationModel[]>(
        appConfig.getAllVacations + userId
      );
      const vacations = response.data;

      const action = vacationAction.initVacation(vacations);
      store.dispatch(action);

      return vacations;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return null;
    }
  }

  public async getOneVacation(
    vacationId: string
  ): Promise<VacationModel | null> {
    try {
      const isValidateToken = await this.validationToken(false);

      if (!isValidateToken) return null;

      const response = await axios.get(appConfig.getOneVacations + vacationId);

      const vacation = response.data;

      return vacation;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return null;
    }
  }

  public async addVacation(vacation: FormData): Promise<VacationModel | null> {
    try {
      const isValidateToken = await this.validationToken(true);
      if (!isValidateToken) return null;

      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await axios.post<VacationModel>(
        appConfig.addVacation,
        vacation,
        options
      );
      const addedVacation = response.data;

      const action = vacationAction.addVacation(addedVacation);
      store.dispatch(action);

      return addedVacation;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return null;
    }
  }

  public async updateVacation(
    vacationId: string,
    vacation: FormData
  ): Promise<VacationModel | null> {
    try {
      const isValidateToken = await this.validationToken(true);
      if (!isValidateToken) return null;

      const option: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const response = await axios.put<VacationModel>(
        appConfig.updateVacation + vacationId,
        vacation,
        option
      );

      const updatedVacation = response.data;

      const action = vacationAction.updateVacation(updatedVacation);
      store.dispatch(action);

      return updatedVacation;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return null;
    }
  }

  public async deleteVacation(vacationId: string): Promise<boolean | null> {
    try {
      const isValidateToken = await this.validationToken(true);
      if (!isValidateToken) return null;

      await axios.delete<void>(appConfig.deleteVacation + vacationId);

      const action = vacationAction.deleteVacation(vacationId);
      store.dispatch(action);

      return true;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      return null;
    }
  }
}

export const vacationService = new VacationService();
