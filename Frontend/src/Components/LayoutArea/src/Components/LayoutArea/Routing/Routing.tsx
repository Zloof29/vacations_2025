import { Navigate, Route, Routes } from "react-router-dom";
import styles from "./Routing.module.css";
import { Login } from "../../../../../UserArea/Login/Login";
import { Register } from "../../../../../UserArea/Register/Register";
import { Page404 } from "../Page404/Page404";
import { VacationList } from "../../../../../VacationArea/VacationList/VacationList";
import { ActiveVacations } from "../../../../../VacationArea/ActiveVacations/ActiveVacations";
import { InActiveVacations } from "../../../../../VacationArea/inActiveVacations/inActiveVacations";
import { LikedVacations } from "../../../../../VacationArea/LikedVacations/LikedVacations";
import { authService } from "../../../../../../Services/AuthService";
import { EditVacation } from "../../../../../VacationArea/EditVacation/EditVacation";
import { AddVacation } from "../../../../../VacationArea/addVacation/addVacation";
import { ROUTES } from "../../../../../../Models/RoutesModel";
import { Chart } from "../../../../../VacationArea/Chart/Chart";
export function Routing(): React.ReactElement {
  function PrivateRoute({
    children,
  }: {
    children: React.ReactElement;
  }): React.ReactElement {
    const isAuthenticated = authService.isAdmin();
    return isAuthenticated ? children : <Navigate to={ROUTES.NOT_FOUND} />;
  }

  function LoggedInRoute({
    children,
  }: {
    children: React.ReactElement;
  }): React.ReactElement {
    const token = authService.getToken();
    const isLoggedIn = authService.isLoggedIn(token);
    return isLoggedIn ? children : <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <div className={styles.Routing}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Login />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route
          path={ROUTES.VACATIONS}
          element={
            <LoggedInRoute>
              <VacationList />
            </LoggedInRoute>
          }
        />
        <Route
          path={ROUTES.ACTIVE_VACATIONS}
          element={
            <LoggedInRoute>
              <ActiveVacations />
            </LoggedInRoute>
          }
        />
        <Route
          path={ROUTES.INACTIVE_VACATIONS}
          element={
            <LoggedInRoute>
              <InActiveVacations />
            </LoggedInRoute>
          }
        />
        <Route
          path={ROUTES.LIKED_VACATIONS}
          element={
            <LoggedInRoute>
              <LikedVacations />
            </LoggedInRoute>
          }
        />
        <Route
          path={ROUTES.EDIT_VACATION}
          element={
            <PrivateRoute>
              <EditVacation />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ADD_VACATION}
          element={
            <PrivateRoute>
              <AddVacation />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.CHART}
          element={
            <PrivateRoute>
              <Chart />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.NOT_FOUND} element={<Page404 />} />
      </Routes>
    </div>
  );
}
