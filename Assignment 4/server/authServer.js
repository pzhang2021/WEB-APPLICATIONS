import express from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { Low, JSONFile } from "lowdb";
import keys from "./config/token.secret.keys.js";
const app = express();

// const db = JSON.parse(fs.readFileSync('./database/db.json', 'utf-8'))

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

const createUser = (username, email, password) => {
  const { users } = db.data;
  const userId = nanoid();
  users.push({ username, email, password, userId });
  db.write();
};

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
    (err, email) => {
      if (err) return res.status(401).json({ error: "token invalid" });
      console.log(email);
      req.email = email;
      next();
    }
  );
};
// create user
app.post("/auth/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  if (isRegistered(email)) {
    res.status(403).json({ error: "email already registered" });
  } else {
    createUser(username, email, password);
    const accessToken = jwt.sign(email, keys.access_token_secret_key, {
      algorithm: "HS256",
    });
    res.status(201).json({ accessToken: accessToken });
  }
});

// test login
app.post("/todo/add", authenticateToken, (req, res) => {
  res.json(db.todoList.filter((post) => post.id === 1));
});

// login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!isAuthenticated(email, password)) {
    res.status(401).json({ error: "incorrect username or password" });
  } else {
    const accessToken = jwt.sign(email, keys.access_token_secret_key, {
      algorithm: "HS256",
    });
    res.json({ accessToken: accessToken });
  }
});

app.listen(4001, () => {
  console.log("Auth Server is running at http://localhost:4001");
});
