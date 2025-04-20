import {
  ValidationError,
  ResourceLikeNotFoundError,
} from "../3-models/client-errors";
import { ILikeModel, LikeModel } from "../3-models/like-model";

class LikeService {
  public async addLike(like: ILikeModel) {
    const existingLike = await LikeModel.findOne({
      userId: like.userId,
      vacationId: like.vacationId,
    }).exec();

    if (existingLike)
      throw new ValidationError(`${like.userId} already liked this vacation!`);

    const error = like.validateSync();

    if (error) throw new ValidationError(error.message);

    return like.save();
  }

  public async deleteLike(userId: string, vacationId: string) {
    const deleteLike = await LikeModel.findOneAndDelete({
      userId,
      vacationId,
    }).exec();
    if (!deleteLike) throw new ResourceLikeNotFoundError(userId, vacationId);
  }
}
export const likeService = new LikeService();
