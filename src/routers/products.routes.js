import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import productsController from "../controllers/products.controller.js";
export const productsRouter = Router();

productsRouter.post("/", adminMiddleware, productsController.createProduct);
productsRouter.get("/", productsController.getProducts);
productsRouter.get("/best", productsController.bestseller);
productsRouter.get("/random", productsController.randomer);
productsRouter.patch(
  "/:id",
  adminMiddleware,
  productsController.productsChenge
);
productsRouter.get("/:id", productsController.findeone);
productsRouter.delete(
  "/:id",
  adminMiddleware,
  productsController.deleteproduct
);
