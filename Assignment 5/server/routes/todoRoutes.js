import { Router } from "express";
import jwt from "jsonwebtoken";
import keys from "../config/token.secret.keys.js";
import {
  getTodoList,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controller/todoController.js";
const router = Router();

// jwt authorization
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
    (err, userID) => {
      if (err) return res.status(403).json({ error: "token invalid" });
      req.userID = userID;
      next();
    }
  );
};

router.get("/list", authenticateToken, getTodoList);
router.post("/add", addTodo);
router.post("/edit", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
