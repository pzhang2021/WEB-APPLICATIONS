import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: String,
  description: String,
  isDone: Boolean,
  time: {
    Day: String,
    Hour: Number,
    Minute: Number,
  },
  author: String,
  isUrgent: Boolean,
  todoId: String,
  userId: String,
});

const TodoModel = mongoose.model("Todo", todoSchema);

export default TodoModel;
