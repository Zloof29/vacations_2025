class AppConfig {
  public readonly getAllVacations = "http://localhost:4000/api/vacations/";
  public readonly getOneVacations = "http://localhost:4000/api/vacation/";
  public readonly addVacation = "http://localhost:4000/api/vacation/";
  public readonly updateVacation = "http://localhost:4000/api/vacation/";
  public readonly deleteVacation = "http://localhost:4000/api/vacation/";
  public readonly register = "http://localhost:4000/api/register/";
  public readonly login = "http://localhost:4000/api/login/";
  public readonly addLike = "http://localhost:4000/api/like/";
  public readonly deleteLike = "http://localhost:4000/api/like/";
  public readonly imageUrl = "http://localhost:4000/images/";
}

export const appConfig = new AppConfig();
