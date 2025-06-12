import { Check, PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link } from "react-router"

import { formatDate } from "../lib/utils"
import api from "../lib/axios"
import toast from "react-hot-toast"

const TaskCard = ({task, setTasks}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault()

    if(!window.confirm("Are you sure you want to delete this task")) return

    try {
      await api.delete(`/notes/${id}`)
      setTasks((prev) => prev.filter(task => task._id !== id)) 
      toast.success("task deleted successfuly")
    } catch (error) {
      console.log("error in handleDelete the task", error)
      toast.error("failed to delete task")      
    }
  }

  return (
    <Link
      to={`/note/${task._id}`}
      className={`card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid ${
        task.priority === "HIGH"
          ? "border-red-500"
          : task.priority === "MEDIUM"
          ? "border-yellow-400"
          : "border-green-500"
      }`}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-base-content">{task.title}</h3>
          <h3
            className={`font-bold text-base-content ${
              task.priority === "HIGH"
                ? "text-red-500"
                : task.priority === "MEDIUM"
                ? "text-yellow-400"
                : "text-green-500"
            }`}
          >
            {task.priority}
          </h3>
        </div>

        <p className="text-base-content/90">{task.category}</p>
        <p className="text-base-content/70 line-clamp-3">{task.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(task.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, task._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
        <span className="text-sm font-bold">
          {task.completed ? (
            <span className="flex items-center gap-1 bg-green-500 text-base-100 p-2 rounded">
              COMPLETED
              <Check className="size-5" />
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-base-content/30 text-base-100 p-2 rounded">TODO</span>
          )}
        </span>
      </div>
    </Link>
  );
}

export default TaskCard