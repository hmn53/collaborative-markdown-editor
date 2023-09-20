import express from "express";
import { CollabServer } from "rushlight-server";

import { loadCheckpoint, saveCheckpoint } from "./db.ts";

const port = Number(process.env.PORT || 8080);

const app = express();
app.use(express.static("dist"));

const collab = await CollabServer.of({
  redisUrl: process.env.REDIS_URL || "redis://localhost:6473",
  loadCheckpoint,
  saveCheckpoint,
});

collab.compactionTask();

app.post("/doc/:id", express.json(), async (req, res) => {
  const id = req.params.id;
  try {
    res.json(await collab.handle(id, req.body));
  } catch (e: any) {
    console.log("Failed to handle user message:", e.toString());
    res.status(400).send(e.toString());
  }
});

app.listen(port);

console.log(`Server listening on port ${port}`);
