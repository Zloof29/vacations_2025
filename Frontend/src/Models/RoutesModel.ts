export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VACATIONS: "/vacations",
  ACTIVE_VACATIONS: "/activeVacations",
  INACTIVE_VACATIONS: "/inActiveVacations",
  LIKED_VACATIONS: "/likedVacations",
  EDIT_VACATION: "/editVacation/:vacationId",
  ADD_VACATION: "/addVacation",
  CHART: "/Chart",
  NOT_FOUND: "/*",
} as const;

export type RoutePaths = (typeof ROUTES)[keyof typeof ROUTES];
