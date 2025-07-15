import express from "express";
import cors from "cors";
import { setTimeout } from "node:timers/promises";
import database from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/assignments", async (req, res) => {
  await setTimeout(5000);
  res.json(database.assignments);
});

app.post("/assignments", async (req, res) => {
  const { task } = req.body;
  console.log(task);
  database.assignments.push({
    id: Math.floor(Math.random() * 500),
    task: task,
    completed: false,
  });
  res.json({ error: false });
});

app.delete("/assignments/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = database.assignments.findIndex(a => a.id === id);

  if (index !== -1) {
    database.assignments.splice(index, 1);
    return res.json({ error: false });
  }

  res.status(404).json({ error: true, message: "Assignment not found" });
});

app.post("/assignments/:id/toggle", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { completed } = req.body;

  // Find the assignment
  const assignment = database.assignments.find(a => a.id === id);

  if (!assignment) {
    return res.status(404).json({ error: true, message: "Assignment not found" });
  }

  // Update the completion state
  assignment.completed = completed;

  res.json({ error: false, updated: assignment });
});


app.listen(8000, () => {
  console.log("Backend Web Server has started 🚀");
});
