import { useForm } from "react-hook-form";
import styles from "./addVacation.module.css";
import { VacationModel } from "../../../Models/VacationModel";
import { notify } from "../../../Utils/Notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { vacationService } from "../../../Services/VacationService";
import { useNavigate } from "react-router-dom";

export function AddVacation(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VacationModel>({ mode: "onChange" });
  const navigate = useNavigate();

  async function send(vacation: VacationModel) {
    try {
      await vacationService.addVacation(vacation);
      notify.success("Vacation has been added.");
      navigate("/vacations");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className={styles.addVacation}>
      <form onSubmit={handleSubmit(send)}>
        <label>Destination: </label>
        <input
          type="text"
          {...register("destination", {
            required: "Destination is required.",
            minLength: {
              value: 3,
              message: "Destination must be at least 3 characters long.",
            },
            maxLength: {
              value: 50,
              message: "Destination must not exceed 50 characters.",
            },
          })}
        />
        {errors.destination && <span>{errors.destination.message}</span>}

        <label>Description: </label>
        <input
          type="text"
          {...register("description", {
            required: "Description is required.",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters long.",
            },
            maxLength: {
              value: 1000,
              message: "Description must not exceed 1000 characters.",
            },
          })}
        />
        {errors.description && <span>{errors.description.message}</span>}

        <label>Start date: </label>
        <input
          type="date"
          {...register("startDate", {
            required: "Start date is required.",
            validate: (value) =>
              !isNaN(Date.parse(value)) || "Invalid date format.",
          })}
        />
        {errors.startDate && <span>{errors.startDate.message}</span>}

        <label>End date: </label>
        <input
          type="date"
          {...register("endDate", {
            required: "End date is required.",
            validate: (value, { startDate }) => {
              if (isNaN(Date.parse(value))) return "Invalid date format.";
              if (new Date(value) <= new Date(startDate))
                return "End date must be after start date.";
              return true;
            },
          })}
        />
        {errors.endDate && <span>{errors.endDate.message}</span>}

        <label>Price: </label>
        <input
          type="number"
          {...register("price", {
            required: "Price is required.",
            validate: (value) =>
              value > 0 || "Price must be a positive number.",
          })}
        />
        {errors.price && <span>{errors.price.message}</span>}

        <label>Image: </label>
        <input
          type="file"
          accept="image/*"
          {...register("image", {
            validate: (file: File) => {
              if (!file) return true;
              if (file.size > 2 * 1024 * 1024)
                return "Image size must not exceed 2MB.";
              return true;
            },
          })}
        />
        {errors.image && <span>{errors.image.message}</span>}
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
