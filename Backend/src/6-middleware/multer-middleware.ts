// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { randomUUID } from "crypto";

// class MulterMiddleware {
//   // private imagesDir = path.resolve("src", "1-assets", "images");
//   private imagesDir = path.join(__dirname, "..", "1-assets", "images");

//   constructor() {
//     if (!fs.existsSync(this.imagesDir)) {
//       fs.mkdirSync(this.imagesDir, { recursive: true });
//     }
//   }

//   public storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       try {
//         callback(null, this.imagesDir);
//       } catch (error) {
//         callback(error as Error | null, "");
//       }
//     },

//     filename: (req, file, callback) => {
//       try {
//         const uniqueName = randomUUID() + path.extname(file.originalname);
//         callback(null, uniqueName);
//       } catch (error) {
//         callback(error as Error | null, "");
//       }
//     },
//   });

//   public upload = multer({ storage: this.storage }).single("image[]");
// }

// export const multerMiddleware = new MulterMiddleware();

import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

class MulterMiddleware {
  private imagesDir: string;

  constructor() {
    this.imagesDir = path.join(__dirname, "..", "1-assets", "images");
    console.log("📁 Upload path:", this.imagesDir); // <== ADD THIS TOO

    if (!fs.existsSync(this.imagesDir)) {
      fs.mkdirSync(this.imagesDir, { recursive: true });
    }

    console.log("🛠️ Upload path:", this.imagesDir); // optional: debug in Render logs
  }

  public storage = multer.diskStorage({
    destination: (req, file, callback) => {
      try {
        callback(null, this.imagesDir);
      } catch (error) {
        callback(error as Error | null, "");
      }
    },

    filename: (req, file, callback) => {
      try {
        const uniqueName = randomUUID() + path.extname(file.originalname);
        console.log("📸 Upload filename:", uniqueName); // <== ADD THIS
        callback(null, uniqueName);
      } catch (error) {
        callback(error as Error | null, "");
      }
    },
  });

  public upload = multer({ storage: this.storage }).single("image");
}

export const multerMiddleware = new MulterMiddleware();
