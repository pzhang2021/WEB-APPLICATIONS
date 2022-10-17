import express from "express";
import jwt from "jsonwebtoken";
import { Low, JSONFile } from "lowdb";
const app = express();
import keys from "./config/token.secret.keys.js";

const db = new Low(new JSONFile("./database/db.json"));
await db.read();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "missing token" });
  jwt.verify(
    token,
    keys.access_token_secret_key,
    {
      algorithm: "HS256",
    },
    (err, username) => {
      if (err) return res.status(401).json({ error: "token invalid" });
      req.username = username;
      next();
    }
  );
};

// add todo list
app.post("/todo/add", authenticateToken, (req, res) => {
  res.json(db.todoList.filter((post) => post.id === 1));
});

app.listen(4000, () => {
  console.log("Todo List Server is running at http://localhost:4000");
});
