export class VacationModel {
  constructor(
    public _id: string,
    public destination: string,
    public description: string,
    public startDate: string,
    public endDate: string,
    public price: number,
    public imagePath: string,
    public image: File,
    public isLiked: boolean,
    public likesCount: number
  ) {}
}
