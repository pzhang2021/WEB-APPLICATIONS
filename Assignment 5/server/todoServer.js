import express from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { Low, JSONFile } from "lowdb";
const app = express();
import keys from "./config/token.secret.keys.js";
import cors from "cors";

app.use(cors({ origin: "http://localhost:3000" }));
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
  res.json({
    status: 0,
    data: todoList.filter((post) => post.userId === req.userId),
  });
});

// add todo list
app.post("/todo/add", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const { ...data } = req.body;
  const todoId = nanoid();
  todoList.push({ ...data, todoId, userId: req.userId });
  db.write();
  res.json({
    status: 0,
    data: todoList.filter((post) => post.userId === req.userId),
  });
});

// delete todo list through params
app.delete("/todo/delete/:id", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const { id } = req.params;
  const index = todoList.findIndex((post) => post.todoId === id);
  if (index === -1) {
    res.status(404).json({ error: "todo not found" });
  } else {
    todoList.splice(index, 1);
    db.write();
    res.json({
      status: 0,
      data: todoList.filter((post) => post.userId === req.userId),
    });
  }
});

// edit existing todo list
app.post("/todo/edit", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const { ...data } = req.body;
  const index = todoList.findIndex((post) => post.todoId === data.todoId);
  if (index !== -1) {
    const newData = {
      title: data.title,
      description: data.description,
      isDone: data.isDone,
      time: data.time,
      author: todoList[index].author,
      isUrgent: todoList[index].isUrgent,
      todoId: data.todoId,
      userId: todoList[index].userId,
    };
    todoList[index] = newData;
    db.write();
    res.json({
      status: 0,
      data: todoList.filter((post) => post.userId === req.userId),
    });
  } else {
    res.json({ error: "todo not found" });
  }
});

// reset the todo list to empty list
app.delete("/todo/reset", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const newList = todoList.filter((post) => post.userId !== req.userId);
  todoList.length = 0;
  todoList.push(...newList);
  db.write();
  res.json({
    status: 0,
    data: todoList.filter((post) => post.userId === req.userId),
  });
});

// clear the todo list if it is completed
app.post("/todo/clear", authenticateToken, (req, res) => {
  const { todoList } = db.data;
  const newList = todoList.filter(
    (post) =>
      (post.userId === req.userId && post.isDone === false) ||
      post.userId !== req.userId
  );
  todoList.length = 0;
  todoList.push(...newList);
  db.write();
  res.json({
    status: 0,
    data: todoList.filter((post) => post.userId === req.userId),
  });
});

app.listen(4000, () => {
  console.log("Todo List Server is running at http://localhost:4000");
});
