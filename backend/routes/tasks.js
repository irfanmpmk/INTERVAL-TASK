import express from "express";
import {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", addTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
