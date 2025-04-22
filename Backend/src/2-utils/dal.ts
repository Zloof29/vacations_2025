import mongoose from "mongoose";
import { appConfig } from "./app-config";

// DAL = Data Access Layer - The only one accessing the database.
class DAL {
  public async connect() {
    try {
      const db = await mongoose.connect(
        appConfig.mongodbConnectionString || ""
      );
      console.log(
        `We're connected to mongoDb database: ${db.connections[0].name}`
      );
    } catch (error: any) {
      console.log(error);
    }
  }
}

export const dal = new DAL();
