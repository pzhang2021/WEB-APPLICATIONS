import { mongoose } from "mongoose";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import keys from "./config/token.secret.keys.js";
import url from "./config/mongodb.config.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", userRoutes);
app.use("/todo", todoRoutes);

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("AuthServer started on port 4000");
});
