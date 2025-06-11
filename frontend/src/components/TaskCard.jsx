import { PenSquareIcon, Trash2Icon } from "lucide-react"
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
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{task.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{task.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(task.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4"/>
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, task._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TaskCard