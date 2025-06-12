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
  category: {
    type:String,
    enum:["Personal","Work","Other"],
    default:"Other",
    required:true
  },
  priority: {
    type:String,
    enum:["LOW","MEDIUM","HIGH"],
    default:"LOW",
    required:true
  },
  completed: {
    type:Boolean,
    default:false,
    required:true
  }
  
}, {timestamps:true})

const Task = mongoose.model("Task", taskSchema)

export default Task