import express from 'express';
const router = express.Router();

router.post("/get", getProduct);

router.post("/set", setProduct);

export default router;

//dummy