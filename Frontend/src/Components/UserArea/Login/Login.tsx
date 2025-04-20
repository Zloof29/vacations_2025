import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { NavLink } from "react-router-dom";

export function Login(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>({ mode: "onChange" });

  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await userService.login(credentials);
      notify.success("Welcome back!");
      navigate("/vacations");
    } catch (error: any) {
      const errorMessage = errorHandler.getError(error);
      notify.error(errorMessage);
    }
  }

  return (
    <div className={styles.Login}>
      <form onSubmit={handleSubmit(send)}>
        <label>Email: </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <label>Password: </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
            maxLength: {
              value: 12,
              message: "Password must be maximum 12 characters long.",
            },
            validate: (value) =>
              /[0-9]/.test(value) ||
              "Password must include at least one number",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button>login</button>

        <div>
          Don't have account?
          <div>
            <NavLink to="/register">Register now</NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
