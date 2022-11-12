import UserModel from "../models/userModel.js";
import keys from "../config/token.secret.keys.js";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({
    email: email,
  });
  if (user) {
    res.status(400).json({
      status: 1,
      error: "Email already registered",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userID = nanoid();
    const newUser = new UserModel({
      username: username,
      email: email,
      password: hash,
      userID: userID,
    });
    await newUser.save();
    // jwt token
    const accessToken = jwt.sign(userID, keys.access_token_secret_key, {
      algorithm: "HS256",
    });
    res.status(200).json({
      status: 0,
      username,
      accessToken,
      userID,
    });
  }
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email: email,
  });
  if (!user) {
    res.status(400).json({
      status: 1,
      error: "User does not exist",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        status: 1,
        error: "Incorrect password",
      });
    } else {
      const accessToken = jwt.sign(user.userID, keys.access_token_secret_key, {
        algorithm: "HS256",
      });
      res.status(200).json({
        status: 0,
        username: user.username,
        accessToken,
        userID: user.userID,
      });
    }
  }
};

export { register, login };
