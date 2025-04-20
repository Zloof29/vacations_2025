import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { ILikeModel } from "../3-models/like-model";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";

class VacationService {
  public async getAllVacations(userId: string) {
    const vacations = VacationModel.find()
      .sort({ startDate: 1 })
      .populate("likes")
      .exec();

    return (await vacations).map((vacation) => {
      const likesCount = vacation.likes.length;
      const isLiked = vacation.likes.some(
        (like: ILikeModel) => like.userId.toString() === userId
      );

      return {
        ...vacation.toJSON(),
        likesCount,
        isLiked,
      };
    });
  }

  public async getOneVacation(vacationId: string) {
    const vacation = VacationModel.findById(vacationId).exec();

    if (!vacation)
      throw new ResourceNotFoundError(
        `Vacation with Id ${vacationId} not found.`
      );

    return vacation;
  }

  public async addVacations(vacation: IVacationModel) {
    const existingVacation = await VacationModel.findOne({
      destination: vacation.destination,
      startDate: vacation.startDate,
    });

    if (existingVacation)
      throw new ValidationError(
        `Vacation with the same destination and start date already exist!`
      );

    const error = vacation.validateSync();

    if (error) throw new ValidationError(error.message);

    return vacation.save();
  }

  public async UpdateVacation(vacation: IVacationModel) {
    const error = vacation.validateSync();

    if (error) throw new ValidationError(error.message);

    const updatedVacation = await VacationModel.findByIdAndUpdate(
      vacation._id,
      vacation,
      { returnOriginal: false }
    ).exec();

    if (!updatedVacation)
      throw new ResourceNotFoundError(vacation._id.toString());

    return updatedVacation;
  }

  public async deleteVacation(_id: string) {
    const deletedVacation = await VacationModel.findByIdAndDelete(_id).exec();
    if (!deletedVacation) throw new ResourceNotFoundError(_id);
  }
}

export const vacationService = new VacationService();
