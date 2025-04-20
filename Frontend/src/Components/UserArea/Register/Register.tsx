import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { NavLink } from "react-router-dom";

export function Register(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>({ mode: "onChange" });

  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await userService.register(user);
      notify.success("Welcome " + user.firstName + " " + user.lastName);
      navigate("/vacations");
    } catch (error: any) {
      const errorMessage = errorHandler.getError(error);
      notify.error(errorMessage);
    }
  }

  return (
    <div className={styles.Register}>
      <form onSubmit={handleSubmit(send)}>
        <label>First name: </label>
        <input
          type="text"
          {...register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "First name must contain only letters.",
            },
          })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label>Last name: </label>
        <input
          type="text"
          {...register("lastName", {
            required: "Last name is required",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Last name must contain only letters",
            },
          })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}

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
              message: "Password must be at least 8 characters long",
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

        <button>Register</button>

        <div>
          already have account?
          <div>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
