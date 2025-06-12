import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const TaskDetailPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTask(res.data);
      } catch (error) {
        console.log("Error in fetchTask", error);
        toast.error("Failed to fetch the tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Task deleted");
      navigate("/");
    } catch (error) {
      console.log("error in handleDelete task", error);
      toast.error("Failed to delete task");
    }
  };

  const handleSave = async () => {
    if (!task.title.trim() || !task.content.trim()) {
      toast.error("please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, task);
      toast.success("Task updated successfully");
      navigate("/");
    } catch (error) {
      console.log("error in handleSave task", error);
      toast.error("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-secondary">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Tasks
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Task
            </button>
          </div>

          {/* TITLE */}
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>

                <input
                  type="text"
                  placeholder="Task title"
                  className="input input-bordered"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
              </div>

              {/* CATEGORY */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>

                <select
                  className="select select-bordered"
                  value={task.category}
                  onChange={(e) => setTask({...task, category:e.target.value})}
                >
                  {/* categories are hard coded for now */}
                  <option disabled value="">
                    Select a Category
                  </option>
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
                    value={task.priority}
                    onChange={(e) => setTask({...task, priority:e.target.value})}
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
                  value={task.content}
                  onChange={(e) =>
                    setTask({ ...task, content: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center w-full">
                {/* COMPLETED ? */}
                  <div className="form-control">
                    <label 
                      className={`btn ${task.completed ? "bg-green-400" : "bg-red-500"} flex items-center cursor-pointer`}
                    >
                      <span className="label-text text-base-100 mr-3">Completed</span>
                      <input 
                        type="checkbox"
                        className="checkbox border-base-100"
                        checked={task.completed}
                        onChange={(e) => setTask({...task, completed:e.target.checked})}                    
                      />
                    </label>
                  </div>

                {/* BUTTON SAVE CAHNGES */}
                <button
                  className="btn btn-priamry ml-auto"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
