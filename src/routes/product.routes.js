import express from "express";
import * as productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, productController.createProduct);   // create
router.get("/", productController.listProducts);                    // list / filter
router.get("/:id", productController.getProduct);                   // read
router.put("/:id", authMiddleware, productController.updateProduct);// update
router.delete("/:id", authMiddleware, productController.deleteProduct); // delete

export default router;
