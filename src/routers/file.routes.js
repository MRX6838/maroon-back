import { Router } from "express";
import multer from "multer";
import fileController from "../controllers/file.controller.js";
export const fileRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const names = file.originalname.split(".");
    const enc = names[names.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + enc);
  },
});

const upload = multer({ storage: storage });

fileRouter.post("/add", upload.single("file"), fileController.addFile);
