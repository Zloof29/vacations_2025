import React from "react";
import "./VacationCard.css";
import { VacationModel } from "../../../Models/VacationModel";
import { appConfig } from "../../../Utils/AppConfig";

interface VacationCardProps {
  vacation: VacationModel;
  onLike: (vacationId: string) => void;
  onUnlike: (vacationId: string) => void;
  onDelete: (vacationId: string) => void;
  onUpdate: (vacationId: string) => void;
  isAdmin: boolean;
}

export function VacationCard({
  vacation,
  onLike,
  onUnlike,
  onDelete,
  onUpdate,
  isAdmin,
}: VacationCardProps): React.ReactElement {
  return (
    <div className="VacationCard">
      <div className="vacation-box" key={vacation._id}>
        <div className="image-container">
          <img
            src={`${appConfig.imageUrl}${vacation.imagePath}`}
            alt={vacation.imagePath}
          />
          <div className="likes-info">
            {isAdmin ? (
              <>
                {onDelete && (
                  <button
                    className="admin-button delete"
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete this vacation?"
                        )
                      ) {
                        onDelete(vacation._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
                {onUpdate && (
                  <button
                    className="admin-button update"
                    onClick={() => onUpdate(vacation._id)}
                  >
                    Update
                  </button>
                )}
              </>
            ) : (
              <>
                {vacation.isLiked ? (
                  <button
                    className="like-status liked"
                    onClick={() => onUnlike(vacation._id)}
                  >
                    Unlike
                  </button>
                ) : (
                  <button
                    className="like-status not-liked"
                    onClick={() => onLike(vacation._id)}
                  >
                    Like
                  </button>
                )}
                <span className="likes-count">{vacation.likesCount} Likes</span>
              </>
            )}
          </div>
        </div>
        <div className="date">
          <p>
            Start Date:
            {new Date(vacation.startDate).toISOString().split("T")[0]}
          </p>
          <p>
            End Date: {new Date(vacation.endDate).toISOString().split("T")[0]}
          </p>
        </div>
        <p className="destination">{vacation.destination}</p>
        <p className="description">{vacation.description}</p>
        <p className="price">Price: ${vacation.price}</p>
      </div>
    </div>
  );
}
