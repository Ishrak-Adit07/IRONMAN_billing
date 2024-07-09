import express from "express";
import { getProduct, getProductsByName, getProductsByType, setProduct } from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("Product route is available");
});

router.get("/get/:name/:type", getProduct);
router.get("/name/:name", getProductsByName);
router.get("/type/:type", getProductsByType);

router.post("/set", setProduct);

export default router;

//dummy
