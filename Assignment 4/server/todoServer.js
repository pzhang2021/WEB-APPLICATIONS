import express from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { Low, JSONFile } from "lowdb";
const app = express();
import keys from "./config/token.secret.keys.js";

const db = new Low(new JSONFile("./database/db.json"));
await db.read();

app.use(express.json());

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
    (err, userId) => {
      if (err) return res.status(403).json({ error: "token invalid" });
      req.userId = userId;
      next();
    }
  );
};

// retrieve todo list
app.get("/todo/list", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  res.json(todoList.filter((post) => post.userId === req.userId));
});

// add todo list
app.post("/todo/add", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const { ...data } = req.body;
  const todoId = nanoid();
  todoList.push({ ...data, todoId, userId: req.userId });
  db.write();
  res.json({ status: 0, todoId });
});

// delete todo list
app.delete("/todo/delete", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const { todoId } = req.body;
  const index = todoList.findIndex((post) => post.todoId === todoId);
  if (index !== -1) {
    todoList.splice(index, 1);
    db.write();
    res.json({ status: 0 });
  } else {
    res.json({ status: 1, error: "Todo not found" });
  }
});

// edit existing todo list
app.post("/todo/edit", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const { ...data } = req.body;
  const index = todoList.findIndex((post) => post.id === data.id);
  if (index !== -1) {
    todoList[index] = data;
    db.write();
    res.json(data);
  } else {
    res.json({ error: "todo not found" });
  }
});

app.listen(4000, () => {
  console.log("Todo List Server is running at http://localhost:4000");
});
