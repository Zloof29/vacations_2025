import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState, likeAction, vacationAction } from "../Redux/store";
import { likeService } from "../Services/LikeService";
import { vacationService } from "../Services/VacationService";
import { notify } from "../Utils/Notify";
import { errorHandler } from "../Utils/ErrorHandler";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";

export function useVacationActions(
  setVacations: React.Dispatch<React.SetStateAction<VacationModel[]>>
) {
  const user = useSelector<AppState, UserModel | null>((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = async (vacationId: string) => {
    if (!user?._id) return;
    try {
      const addedLike = await likeService.addLike(user._id, vacationId);
      notify.success("Like added successfully!");
      setVacations((prevVacations) =>
        prevVacations.map((vacation) =>
          vacation._id === vacationId
            ? {
                ...vacation,
                isLiked: true,
                likesCount: vacation.likesCount + 1,
              }
            : vacation
        )
      );

      const action = likeAction.addLike(addedLike);
      dispatch(action);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleUnlike = async (vacationId: string) => {
    if (!user?._id) return;
    try {
      await likeService.deleteLike(user._id, vacationId);
      notify.success("Like removed successfully!");
      setVacations((prevVacations) =>
        prevVacations.map((vacation) =>
          vacation._id === vacationId
            ? {
                ...vacation,
                isLiked: false,
                likesCount: vacation.likesCount - 1,
              }
            : vacation
        )
      );

      const action = likeAction.removeLike({ userId: user._id, vacationId });
      dispatch(action);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleDelete = async (vacationId: string) => {
    try {
      await vacationService.deleteVacation(vacationId);
      notify.success("Vacation has been deleted.");

      setVacations((prevVacations) =>
        prevVacations.filter((vacation) => vacation._id !== vacationId)
      );

      const action = vacationAction.deleteVacation(vacationId);
      dispatch(action);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleUpdate = (vacationId: string) => {
    navigate(`/editVacation/${vacationId}`);
  };

  return { handleLike, handleUnlike, handleDelete, handleUpdate };
}
