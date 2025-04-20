import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

class MulterMiddleware {
  private imagesDir = path.resolve("src", "1-assets", "images");

  constructor() {
    if (!fs.existsSync(this.imagesDir)) {
      fs.mkdirSync(this.imagesDir, { recursive: true });
    }
  }

  public storage = multer.diskStorage({
    destination: (req, file, callback) => {
      try {
        callback(null, this.imagesDir);
      } catch (error) {
        callback(error, null);
      }
    },

    filename: (req, file, callback) => {
      try {
        const uniqueName = randomUUID() + path.extname(file.originalname);
        callback(null, uniqueName);
      } catch (error) {
        callback(error, null);
      }
    },
  });

  public upload = multer({ storage: this.storage }).single("image[]");
}

export const multerMiddleware = new MulterMiddleware();
