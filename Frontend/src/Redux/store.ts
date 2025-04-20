import { configureStore, createSlice } from "@reduxjs/toolkit";
import { LikeModel } from "../Models/LikeModel";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import {
  addLike,
  addVacation,
  deleteVacation,
  initUser,
  initVacation,
  logoutUser,
  removeLike,
  updateVacation,
} from "./reducers";

export type AppState = {
  vacations: VacationModel[];
  user: UserModel | null;
  likes: LikeModel[];
};

const vacationSlice = createSlice({
  name: "vacations",
  initialState: [] as VacationModel[],
  reducers: {
    initVacation,
    addVacation,
    updateVacation,
    deleteVacation,
  },
});

const userSlice = createSlice({
  name: "users",
  initialState: null as UserModel | null,
  reducers: {
    initUser,
    logoutUser,
  },
});

const likeSlice = createSlice({
  name: "likes",
  initialState: [] as LikeModel[],
  reducers: {
    addLike,
    removeLike,
  },
});

export const vacationAction = vacationSlice.actions;
export const userAction = userSlice.actions;
export const likeAction = likeSlice.actions;

export const store = configureStore<AppState>({
  reducer: {
    vacations: vacationSlice.reducer,
    user: userSlice.reducer,
    likes: likeSlice.reducer,
  },
});
