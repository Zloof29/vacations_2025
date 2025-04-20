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
import styles from "./inActiveVacations.module.css";
import { usePagination } from "../../../Hooks/usePagination";

export function InActiveVacations(): React.ReactElement {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useSelector<AppState, UserModel | null>((store) => store.user);
  const { handleLike, handleUnlike, handleDelete, handleUpdate } =
    useVacationActions(setVacations);

  useEffect(() => {
    if (user?._id) {
      vacationService
        .getAllVacations(user._id)
        .then((vacations) => {
          setVacations(vacations || []);
        })
        .catch((error: any) => notify.error(errorHandler.getError(error)))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const vacationsMemo = useMemo(() => {
    return vacations.filter((vacation) => {
      const now = new Date();
      return (
        new Date(vacation.startDate) > now || new Date(vacation.endDate) < now
      );
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
    return <p>Loading vacations...</p>;
  }

  if (vacations.length === 0) {
    return <p>No vacations available.</p>;
  }

  return (
    <div>
      <div className={styles.VacationContainer}>
        {vacationsMemo?.map((vacation) => (
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
