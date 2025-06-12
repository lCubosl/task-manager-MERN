import Task from "../models/Tasks.js"

export async function getAllTasks(_, res) {
  try {
    // created at -1 means the order of tasks is reversed (newest firsta)
    const tasks = await Task.find().sort({createdAt:-1})
    res.status(200).json(tasks)
  } catch (error) {
    console.error("Error in getAllTasks controller", error)
    res.status(500).json({message:"server internal error"})
  }
}

export async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id)    
    if(!task) return res.status(404).json({message:"task not found"})

    res.status(201).json(task)
  } catch (error) {
    console.error("Error in getTaskById controller", error)
    res.status(500).json({message:"server internal error"})    
  }
}

export async function createTask(req, res) {
  try {
    const {title, content, category, priority, completed} = req.body

    const task = new Task({title, content, category, priority, completed})
    const savedTask = await task.save()

    res.status(201).json(savedTask)
  } catch (error) {
    console.error("Error in createTask controller", error)
    res.status(500).json({message:"server internal error"})
  }
}

export async function updateTask(req, res) {
  try {
    const {title, content, category, priority, completed} = req.body

    // runValidators ensures category and priority only have names listed in the enum
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {title, content, category, priority, completed},{new:true, runValidators:true})
    if(!updatedTask) return res.status(404).json({message:"task not found"})

    res.status(200).json(updatedTask)
  } catch (error) {
    console.error("Error in updateNote controller", error)
    res.status(500).json({message:"server internal error"})    
  }
}

export async function deleteTask(req, res) {
  try {
    const deletedNote = await Task.findByIdAndDelete(req.params.id)    
    if(!deletedNote) return res.status(404).json({message:"task not found"})
        
    res.status(200).json({message:"task deleted successfully"})
  } catch (error) {
    console.error("Error in deleteTask controller", error)
    res.status(500).json({message:"server internal error"})    
  }
}