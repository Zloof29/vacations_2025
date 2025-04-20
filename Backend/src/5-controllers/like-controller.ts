import express, { Request, Response, NextFunction } from "express";
import { LikeModel } from "../3-models/like-model";
import { likeService } from "../4-services/like-service";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";

class LikeController {
  public readonly router = express.Router();

  public constructor() {
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post(
      "/like/:userId/:vacationId",
      securityMiddleware.verifyLoggedIn,
      this.addLike
    );
    this.router.delete(
      "/like/:userId/:vacationId",
      securityMiddleware.verifyLoggedIn,
      this.deleteLike
    );
  }

  private async addLike(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = request.params.userId;
      const vacationId = request.params.vacationId;
      const like = new LikeModel({ userId, vacationId });
      await likeService.addLike(like);
      response.sendStatus(StatusCode.Created);
    } catch (error: any) {
      next(error);
    }
  }

  private async deleteLike(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = request.params.userId;
      const vacationId = request.params.vacationId;
      await likeService.deleteLike(userId, vacationId);
      response.sendStatus(StatusCode.NoContent);
    } catch (error: any) {
      next(error);
    }
  }
}

const likeController = new LikeController();
export const likeRouter = likeController.router;
