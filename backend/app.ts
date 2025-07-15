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

app.post("/assignments/:id/delete", async (req, res) => {
  const id = req.params.id;
  res.json({ test: "you hit delete" });
});

app.post("/assignments/:id/toggle", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.json({ test: "you toggled complete" });
});

app.listen(8000, () => {
  console.log("Backend Web Server has started 🚀");
});
