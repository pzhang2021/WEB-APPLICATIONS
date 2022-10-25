import express from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { Low, JSONFile } from "lowdb";
import keys from "./config/token.secret.keys.js";
import cors from "cors";
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

const db = new Low(new JSONFile("./database/db.json"));
await db.read();

app.use(express.json());

const isAuthenticated = (email, password) => {
  const { users } = db.data;
  const index = users.findIndex(
    (user) => user.email === email && user.password === password
  );
  return index !== -1;
};

const isRegistered = (email) => {
  const { users } = db.data;
  const index = users.findIndex((user) => user.email === email);
  return index !== -1;
};

const getUser = (email) => {
  const { users } = db.data;
  const user = users.find((user) => user.email === email);
  return user;
};

const createUser = (username, email, password) => {
  const { users } = db.data;
  const userId = nanoid();
  users.push({ username, email, password, userId });
  db.write();
  return userId;
};

// create user
app.post("/auth/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  if (isRegistered(email)) {
    res.json({ status: 1, error: "Email already registered" });
  } else {
    const userId = createUser(username, email, password);
    const accessToken = jwt.sign(userId, keys.access_token_secret_key, {
      algorithm: "HS256",
    });
    res.json({ status: 0, username, accessToken, userId });
  }
});

// login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!isAuthenticated(email, password)) {
    res
      .status(401)
      .json({ status: 1, error: "Email or password is incorrect" });
  } else {
    const user = getUser(email);
    const accessToken = jwt.sign(user.userId, keys.access_token_secret_key, {
      algorithm: "HS256",
    });
    res.json({
      status: 0,
      username: user.username,
      accessToken,
      userId: user.userId,
    });
  }
});

// refresh token

app.listen(4001, () => {
  console.log("Auth Server is running at http://localhost:4001");
});
