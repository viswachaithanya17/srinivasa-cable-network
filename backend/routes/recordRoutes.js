import express from "express";
import upload from "../middleware/upload.js";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} from "../controllers/recordController.js";

const router = express.Router();

router.post("/", upload.single("image"), createRecord);
router.get("/", getRecords);
router.put("/:id", upload.single("image"), updateRecord);
router.delete("/:id", deleteRecord);

export default router;
