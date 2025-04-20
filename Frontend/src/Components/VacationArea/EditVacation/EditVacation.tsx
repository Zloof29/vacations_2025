import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { appConfig } from "../../../Utils/AppConfig";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { notify } from "../../../Utils/Notify";
import styles from "./EditVacation.module.css";

export function EditVacation(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VacationModel>({ mode: "onChange" });

  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const { vacationId } = useParams<{ vacationId: string }>();

  useEffect(() => {
    if (vacationId) {
      vacationService
        .getOneVacation(vacationId)
        .then((vacation) => {
          if (vacation) {
            setValue("destination", vacation.destination);
            setValue("description", vacation.description);
            setValue(
              "startDate",
              new Date(vacation.startDate).toISOString().split("T")[0]
            );
            setValue(
              "endDate",
              new Date(vacation.endDate).toISOString().split("T")[0]
            );
            setValue("price", vacation.price);
            setCurrentImage(vacation.imagePath);
          }
        })
        .catch((error: any) => {
          notify.error(errorHandler.getError(error));
        });
    }
  }, [vacationId]);

  async function send(vacation: VacationModel) {
    try {
      if (vacationId) {
        const imageFileList = (vacation as any).image as FileList | undefined;

        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());

        if (imageFileList && imageFileList.length > 0) {
          formData.append("image", imageFileList[0]);
        } else if (currentImage) {
          formData.append("imagePath", currentImage);
        }

        await vacationService.updateVacation(vacationId, formData);

        navigate("/vacations");
      } else {
        notify.error("Vacation ID is missing.");
      }
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className={styles.EditVacation}>
      <form onSubmit={handleSubmit(send)}>
        <label>Destination: </label>
        <input
          type="test"
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

        {currentImage && (
          <img
            src={appConfig.imageUrl + currentImage}
            alt="Vacation"
            width="200"
          />
        )}

        <label>Image: </label>
        <input type="file" accept="image/*" {...register("image")} />
        {errors.image && <span>{errors.image.message}</span>}
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
