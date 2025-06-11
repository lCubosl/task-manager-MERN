import mongoose from "mongoose";

// schema
// model based off schema

const taskSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  content: {
    type:String,
    required:true
  },
  
}, {timestamps:true})

const Task = mongoose.model("Task", taskSchema)

export default Task