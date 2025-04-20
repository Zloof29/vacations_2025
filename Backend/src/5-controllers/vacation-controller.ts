import express, { Request, Response, NextFunction } from "express";
import { vacationService } from "../4-services/vacation-service";
import { StatusCode } from "../3-models/enums";
import { VacationModel } from "../3-models/vacation-model";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { multerMiddleware } from "../6-middleware/multer-middleware";
import multer from "multer";
const upload = multer({ dest: "../src/1-assets/images" });

class VacationController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.get(
      "/vacations/:userId",
      securityMiddleware.verifyLoggedIn,
      this.getAllVacations
    );
    this.router.get(
      "/vacation/:vacationId",
      securityMiddleware.verifyLoggedIn,
      this.getOneVacation
    );
    this.router.post(
      "/vacation",
      securityMiddleware.verifyAdmin,
      multerMiddleware.upload,
      this.addVacation
    );
    this.router.put(
      "/vacation/:_id",
      securityMiddleware.verifyAdmin,
      multerMiddleware.upload,
      this.updateVacation
    );
    this.router.delete(
      "/vacation/:_id",
      securityMiddleware.verifyAdmin,
      this.deleteVacation
    );
    this.router.post("/upload", upload.single("image"), this.uploadFile);
  }

  private async getAllVacations(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = request.params.userId;
      const vacations = await vacationService.getAllVacations(userId);
      response.json(vacations);
    } catch (error: any) {
      next(error);
    }
  }

  private async getOneVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const vacationId = request.params.vacationId;
      const vacation = await vacationService.getOneVacation(vacationId);
      response.json(vacation);
    } catch (error: any) {
      next(error);
    }
  }

  private async addVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const vacation = new VacationModel(request.body);
      if (request.file) {
        vacation.imagePath = request.file.filename;
      }
      const addedVacation = await vacationService.addVacations(vacation);
      response.status(StatusCode.Created).json(addedVacation);
    } catch (error: any) {
      next(error);
    }
  }

  private async updateVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const _id = request.params._id;

      if (!_id) {
        return response
          .status(StatusCode.BadRequest)
          .json({ message: "Vacation ID is required." });
      }

      request.body._id = _id;

      if (request.file) {
        request.body.imagePath = request.file.filename;
      }

      const vacation = new VacationModel(request.body);
      const updatedVacation = await vacationService.UpdateVacation(vacation);
      response.json(updatedVacation);
    } catch (error: any) {
      next(error);
    }
  }

  private async deleteVacation(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const _id = request.params._id;

      if (!_id) {
        return response
          .status(StatusCode.BadRequest)
          .json({ message: "Vacation ID is required." });
      }

      await vacationService.deleteVacation(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (error: any) {
      next(error);
    }
  }

  private async uploadFile(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      if (!request.file) {
        return response
          .status(StatusCode.BadRequest)
          .json({ message: "No file uploaded." });
      }

      response.json({
        file_info: request.file,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

const vacationController = new VacationController();
export const vacationRouter = vacationController.router;
