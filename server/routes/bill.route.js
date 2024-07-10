import express from 'express';
import { createBill, deleteBill, getBillByID, getBills, getBillsByClient, getBillsByDate, getBillsByDateRange, getBillsByEmployee } from '../controllers/bill.controller';
const router = express.Router();

router.get("/", getBills);
router.get("/get/id/:id", getBillByID);
router.get("/get/employee/:employee", getBillsByEmployee);
router.get("/get/client/:client", getBillsByClient);

router.post("/create", createBill);
router.post("/get/date", getBillsByDate);
router.post("/get/dates", getBillsByDateRange);

router.delete("/delete", deleteBill);

export default router;