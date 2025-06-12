import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router"
import api from "../lib/axios"

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [completed, setCompleted] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!title.trim() || !content.trim() || !category.trim() || !priority.trim()) {
      toast.error("All fields required")
    }

    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content,
        category,
        priority,
        completed,
      })
      toast.success("Task created successfully")
      navigate("/")
    } catch (error) {
      console.log("error creating taks", error)
      toast.error("Failed to create task")
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-secondary mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Tasks
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Task</h2>
              <form onSubmit={handleSubmit}>
                {/* TITLE */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Task Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* CATEGORY */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>

                  <select
                    className="select select-bordered"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {/* categories are hard coded for now */}
                    <option disabled value="">Select a Category</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* PRIORITY */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Priority</span>
                  </label>

                  <select
                    className="select select-bordered"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    {/* priorities are hard coded for now */}
                    <option disabled value="">Select Task Priority</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                {/* CONTENT */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>

                  <textarea
                    placeholder="Write your task here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="flex items-center w-full">
                  {/* COMPLETED ? */}
                  <div className="form-control">
                    <label 
                      className={`btn ${completed ? "bg-green-400" : "bg-red-500"} flex items-center cursor-pointer`}
                    >
                      <span className="label-text text-base-100 mr-3">Completed</span>
                      <input 
                        type="checkbox"
                        className="checkbox border-base-100"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}                    
                      />
                    </label>
                  </div>

                  {/* Create Task button */}
                  <button
                    type="submit"
                    className="btn btn-primary ml-auto"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage