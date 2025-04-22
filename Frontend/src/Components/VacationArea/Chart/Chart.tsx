import { useEffect, useState } from "react";
import styles from "./Chart.module.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";

export function Chart(): React.ReactElement {
  const user = useSelector<AppState, UserModel | null>((store) => store.user);
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      vacationService
        .getAllVacations(user._id)
        .then((vacations) => setVacations(vacations || []))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleBarClick = (event: MouseEvent, data: any) => {
    console.log("Bar Clicked: ", data);

    const clickedVacation = vacations[data.dataIndex];

    if (clickedVacation) {
      navigate(`/editVacation/${clickedVacation?._id}`);
    } else {
      notify.error("Vacation not found for the clicked bar.");
    }
  };

  if (loading) {
    <div>Loading...</div>;
  }
  return (
    <div className={styles.Chart}>
      <BarChart
        dataset={vacations.map((v) => ({
          _id: v._id,
          destination: v.destination,
          likesCount: v.likesCount,
        }))}
        xAxis={[
          {
            scaleType: "band",
            categoryGapRatio: 0.5,
            colorMap: {
              type: "ordinal",
              colors: [
                "#ccebc5",
                "#a8ddb5",
                "#7bccc4",
                "#4eb3d3",
                "#2b8cbe",
                "#08589e",
              ],
            },
            data: vacations.map((v) => v.destination),
          },
        ]}
        series={[{ dataKey: "likesCount" }]}
        height={300}
        onAxisClick={handleBarClick}
        {...({} as any)} // Type assertion to bypass the error
      />
    </div>
  );
}
