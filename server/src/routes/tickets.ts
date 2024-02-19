/** @format */

import express, { Router } from "express";
import { productController } from "../controllers/products";
import { verifyAdmin, verifyUser } from "../middlewares/auth-middleware";
import { fileUploader } from "../middlewares/multer";
export const route: Router = express.Router();
route.get("/", productController.getProducts);
route.get("/:id", productController.getProductById);
route.patch(
  "/:id",
  verifyUser,
  verifyAdmin,
  fileUploader({
    destinationFolder: "/images/product_images",
    prefix: "PRODUCT",
    filetype: "image",
  }).single("image"),

  productController.editProduct
);

route.post(
  "/",
  verifyUser,
  verifyAdmin,
  fileUploader({
    destinationFolder: "/images/product_images",
    prefix: "PRODUCT",
    filetype: "image",
  }).single("image"),
  productController.addProduct
);

route.delete("/:id", verifyUser, verifyAdmin, productController.deleteProduct);
