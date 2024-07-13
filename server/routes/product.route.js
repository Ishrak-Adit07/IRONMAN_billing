import express from "express";
import { addProduct, deleteProduct, editPrice, getProduct, getProductPrice, getProducts, getProductsByName, getProductsByType } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/get/:name/:type", getProduct);
router.get("/get/price/:name/:type", getProductPrice);
router.get("/name/:name", getProductsByName);
router.get("/type/:type", getProductsByType);

router.post("/add", addProduct);

router.put("/price", editPrice);

router.delete("/delete", deleteProduct);

export default router;