import express from "express";
import { addProduct, deleteProduct, editPrice, getProduct, getProductsByName, getProductsByType } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("Product route is available");
});

router.get("/get/:name/:type", getProduct);
router.get("/name/:name", getProductsByName);
router.get("/type/:type", getProductsByType);

router.post("/add", addProduct);

router.put("/price", editPrice);

router.delete("/delete", deleteProduct);

export default router;