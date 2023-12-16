import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
export const adminRouter = Router();

adminRouter.post("/registration", adminController.registration);
adminRouter.post("/login", adminController.login);
adminRouter.get("/", adminMiddleware, adminController.findMe);
