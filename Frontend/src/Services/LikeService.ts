import axios from "axios";
import { LikeModel } from "../Models/LikeModel";
import { appConfig } from "../Utils/AppConfig";
import { likeAction, store } from "../Redux/store";
import { errorHandler } from "../Utils/ErrorHandler";

class LikeService {
  public async addLike(userId: string, vacationId: string): Promise<LikeModel> {
    try {
      const response = await axios.post<LikeModel>(
        `${appConfig.addLike}${userId}/${vacationId}`
      );

      const addedLike = response.data;

      const action = likeAction.addLike(addedLike);
      store.dispatch(action);

      return addedLike;
    } catch (error: any) {
      console.log(errorHandler.getError(error));
      throw error;
    }
  }

  public async deleteLike(userId: string, vacationId: string): Promise<void> {
    try {
      const response = await axios.delete<LikeModel>(
        `${appConfig.deleteLike}${userId}/${vacationId}`
      );

      const deletedLike = response.data;

      const action = likeAction.removeLike(deletedLike);
      store.dispatch(action);
    } catch (error: any) {
      console.log(errorHandler.getError(error));
    }
  }
}

export const likeService = new LikeService();
