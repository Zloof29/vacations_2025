import { useSelector } from "react-redux";
import styles from "./UserMenu.module.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "../../../Services/AuthService";

export function UserMenu(): React.ReactElement {
  const user = useSelector<AppState, UserModel | null>((store) => store.user);

  function logout() {
    userService.logout();
  }

  useEffect(() => {
    const isTokenExpired = () => {
      const token = authService.getToken();
      const checkToken = authService.isLoggedIn(token);

      if (!checkToken) {
        logout();
      }
    };

    isTokenExpired();
    const intervalId = setInterval(isTokenExpired, 1 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.UserMenu}>
      {!user && (
        <>
          <span>Hello Guest | </span>
          <NavLink to="/register">Register</NavLink>
          <span> | </span>
          <NavLink to="/login">Login</NavLink>
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName} |
          </span>
          <NavLink
            to="login"
            onClick={(event) => {
              const confirmLogOut = window.confirm(
                "Are you sure you want to log out?"
              );
              if (confirmLogOut) {
                logout();
              } else {
                event.preventDefault();
              }
            }}
          >
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}
