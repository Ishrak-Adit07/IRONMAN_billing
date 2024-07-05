import express from 'express';
import { getProduct, setProduct } from '../controllers/product.controller';
const router = express.Router();


router.get("/", async(req, res)=>{
    res.status(200).send("Product route is available");
});

router.post("/get", getProduct);

router.post("/set", setProduct);

export default router;

//dummy