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

// class AppConfig {
//   private readonly baseUrl = import.meta.env.VITE_API_URL;

//   public readonly getAllVacations = `${this.baseUrl}/vacations/`;
//   public readonly getOneVacations = `${this.baseUrl}/vacation/`;
//   public readonly addVacation = `${this.baseUrl}/vacation/`;
//   public readonly updateVacation = `${this.baseUrl}/vacation/`;
//   public readonly deleteVacation = `${this.baseUrl}/vacation/`;
//   public readonly register = `${this.baseUrl}/register/`;
//   public readonly login = `${this.baseUrl}/login/`;
//   public readonly addLike = `${this.baseUrl}/like/`;
//   public readonly deleteLike = `${this.baseUrl}/like/`;
//   public readonly imageUrl = `${this.baseUrl.replace("/api", "")}/images/`;
// }
// export const appConfig = new AppConfig();
