import express from 'express';
import { getBill, setBill } from '../controllers/bill.controller';
const router = express.Router();


router.get("/", async(req, res)=>{
    res.status(200).send("Bill route is available");
});

router.post("/get", getBill);

router.post("/set", setBill);

export default router;

//dummy