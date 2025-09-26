import express from "express";
import todoModels from "../models/todoModels.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Get
router.get("/", auth, async (req, res) => {
  const { filter } = req.query;
  try {
    let query = { user: req.user.id };
    if (filter === "completed") query.completed = true;
    if (filter === "active") query.completed = false;
    const todos = await todoModels.find(query).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Create
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const todo = new todoModels({
      user: req.user.id,
      title,
      description,
      dueDate,
    });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Update
router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await todoModels.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!todo) return res.status(404).json({ message: "Not found" });
    const { title, description, completed, dueDate } = req.body;
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await todoModels.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
