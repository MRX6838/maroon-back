import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { adminRouter } from "./routers/admin.routes.js";
import { productsRouter } from "./routers/products.routes.js";
import { Products } from "./models/products.js";
import cors from "cors";
import { fileRouter } from "./routers/file.routes.js";
import path from "path";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));
app.use(cors({ origin: "*" }));

app.use("/admin", adminRouter);
app.use("/products", productsRouter);
app.use("/file", fileRouter);

const port = process.env.PORT || 4001;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server started on t ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
