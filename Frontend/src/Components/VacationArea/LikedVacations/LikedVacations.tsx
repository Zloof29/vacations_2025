import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useVacationActions } from "../../../Hooks/useVacationActions";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/store";
import { authService } from "../../../Services/AuthService";
import { vacationService } from "../../../Services/VacationService";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { notify } from "../../../Utils/Notify";
import { VacationCard } from "../VacationCard/VacationCard";
import styles from "./LikedVacations.module.css";
import { usePagination } from "../../../Hooks/usePagination";

export function LikedVacations(): React.ReactElement {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector<AppState, UserModel | null>((store) => store.user);
  const { handleLike, handleUnlike, handleDelete, handleUpdate } =
    useVacationActions(setVacations);

  useEffect(() => {
    if (user?._id) {
      vacationService
        .getAllVacations(user._id)
        .then((vacations) => setVacations(vacations || []))
        .catch((error: any) => notify.error(errorHandler.getError(error)))
        .finally(() => setLoading(false));
    }
  }, []);

  const vacationsMemo = useMemo(() => {
    return vacations?.filter((vacation) => {
      return vacation.isLiked === true;
    });
  }, [vacations]);

  const itemsPerPage = 5;
  const {
    currentItem: paginatedVacations,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = usePagination(vacationsMemo, itemsPerPage);

  if (loading) {
    return <div>Loading Vacations...</div>;
  }

  if (!vacations || vacations.length === 0 || vacationsMemo.length === 0) {
    return <div>No liked vacations available.</div>;
  }

  return (
    <div>
      <div className={styles.VacationContainer}>
        {paginatedVacations.map((vacation: VacationModel) => (
          <VacationCard
            key={vacation._id}
            vacation={vacation}
            onLike={handleLike}
            onUnlike={handleUnlike}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            isAdmin={authService.isAdmin()}
          />
        ))}
      </div>

      <div className={styles.PaginationControls}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
