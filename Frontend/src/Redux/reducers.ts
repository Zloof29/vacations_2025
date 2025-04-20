import { LikeModel } from "../Models/LikeModel";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { Action, PayloadAction } from "@reduxjs/toolkit";

export function initVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel[]>
) {
  const newState: VacationModel[] = action.payload;
  return newState;
}

export function addVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
) {
  const newState: VacationModel[] = currentState;
  newState.push(action.payload);
  return newState;
}

export function updateVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
) {
  const newState: VacationModel[] = currentState.map((vacation) =>
    vacation._id === action.payload._id ? action.payload : vacation
  );
  return newState;
}

export function deleteVacation(
  currentState: VacationModel[],
  action: PayloadAction<string>
) {
  const newState: VacationModel[] = currentState.filter(
    (vacation) => vacation._id !== action.payload
  );
  return newState;
}

export function initUser(
  currentState: UserModel | null,
  action: PayloadAction<UserModel>
) {
  const newState: UserModel = action.payload;
  return newState;
}

export function logoutUser(currentState: UserModel | null, action: Action) {
  const newState: UserModel | null = null;
  return newState;
}

export function addLike(
  currentState: LikeModel[],
  action: PayloadAction<LikeModel>
): LikeModel[] {
  return [...currentState, action.payload];
}

export function removeLike(
  currentState: LikeModel[],
  action: PayloadAction<{ userId: string; vacationId: string }>
): LikeModel[] {
  return currentState.filter(
    (like) =>
      !(
        like.userId === action.payload.userId &&
        like.vacationId === action.payload.vacationId
      )
  );
}

// export function likeVacation(
//   currentState: LikeModel[],
//   action: PayloadAction<LikeModel>
// ) {
//   const newState: LikeModel[] = currentState.some(
//     (like) =>
//       like.userId === action.payload.userId &&
//       like.vacationId === action.payload.vacationId
//   )
//     ? currentState.filter(
//         (like) =>
//           !(
//             like.userId === action.payload.userId &&
//             like.vacationId === action.payload.vacationId
//           )
//       )
//     : [...currentState, action.payload];

// return newState;
// }
