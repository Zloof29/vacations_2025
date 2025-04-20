import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
import { authService } from "../../../../../../Services/AuthService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../../Redux/store";
import { UserModel } from "../../../../../../Models/UserModel";
import { notify } from "../../../../../../Utils/Notify";
import { errorHandler } from "../../../../../../Utils/ErrorHandler";
import { Role } from "../../../../../../Models/Enums";

export function Menu(): React.ReactElement {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useSelector<AppState, UserModel | null>((store) => store.user);

  useEffect(() => {
    try {
      const token = authService.getToken();
      const checkLoggedin = authService.isLoggedIn(token);
      setIsLoggedin(checkLoggedin);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  const links = [
    { to: "/vacations", label: "Vacations" },
    { to: "/activeVacations", label: "Active vacations" },
    { to: "/inactiveVacations", label: "Inactive vacations" },
    { to: "/likedVacations", label: "Liked vacations" },
    { to: "/addVacation", label: "Add vacation" },
    { to: "/chart", label: "Chart" },
  ];

  const filteredLinks =
    user?.roleId === Role.Admin
      ? links.filter((link) => !["/likedVacations"].includes(link.to))
      : links.filter((link) => !["/addVacation", "/chart"].includes(link.to));

  return (
    <div className={styles.Container}>
      {isLoggedin && user?._id
        ? filteredLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={styles.Item}>
              {link.label}
            </NavLink>
          ))
        : null}
    </div>
  );
}
