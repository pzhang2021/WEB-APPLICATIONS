const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [];

const posts = [
  { username: "Pengju", title: "post 1" },
  { username: "Pengju2", title: "post 2" },
  { username: "Pengju3", title: "post 3" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/post", (req, res) => {
  res.json(posts);
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user === null) {
    return res.status(400).send("user not found");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("success");
    } else {
      res.send("error");
    }
  } catch (error) {
    res.status(500).send();
  }
});
app.listen(4000);
