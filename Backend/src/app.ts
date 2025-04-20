import cors from "cors";
import express from "express";
import { appConfig } from "./2-utils/app-config";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { loggerMiddleware } from "./6-middleware/logger-middleware";
import { vacationRouter } from "./5-controllers/vacation-controller";
import { dal } from "./2-utils/dal";
import { userRouter } from "./5-controllers/user-controller";
import { likeRouter } from "./5-controllers/like-controller";
import path from "path";

// Main application class:
class App {
  // Express server:
  private server = express();

  // Start app:
  public async start() {
    // Enable CORS requests:
    this.server.use(cors()); // Enable CORS for any frontend website.

    // Create a request.body containing the given json from the front:
    this.server.use(express.json());

    // Register middleware:
    this.server.use(loggerMiddleware.logToConsole);

    // Connect any controller route to the server:
    this.server.use("/api", vacationRouter, userRouter, likeRouter);

    this.server.use(
      "/images",
      express.static(path.resolve("src", "1-assets", "images"))
    );

    // Route not found middleware:
    this.server.use(errorsMiddleware.routeNotFound);

    // Catch all middleware:
    this.server.use(errorsMiddleware.catchAll);

    await dal.connect();

    this.server.listen(appConfig.port, () =>
      console.log("Listening on http://localhost:" + appConfig.port)
    );
  }
}

const app = new App();
app.start();
