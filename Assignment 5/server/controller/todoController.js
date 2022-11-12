import TodoModel from "../models/todoModel.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import keys from "../config/token.secret.keys.js";

// retrieve todo list from mongoose database
const getTodoList = async (req, res) => {
  const todoList = await TodoModel.find({ userId: req.userId })
    .then((todoList) => {
      res.status(200).json({
        status: 0,
        data: todoList,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 1,
        error: err,
      });
    });
};

// add Todo
const addTodo = async (req, res) => {
  const { ...data } = req.body;
  const todoId = nanoid();
  const newTodo = new TodoModel({
    ...data,
    todoId,
    userID: req.userID,
  });
  await newTodo.save();
  res.status(200).json({
    status: 0,
    data: newTodo,
  });
};

// delete Todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await TodoModel.findOneAndDelete({ todoId: id })
    .then((todo) => {
      res.status(200).json({
        status: 0,
        data: todo,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 1,
        error: err,
      });
    });
};

// update Todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const todo = await TodoModel.findOneAndUpdate(
    { todoId: id },
    { ...data },
    { new: true }
  )
    .then((todo) => {
      res.status(200).json({
        status: 0,
        data: todo,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 1,
        error: err,
      });
    });
};

// reset todo list

export { getTodoList, addTodo, deleteTodo, updateTodo };
