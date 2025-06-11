import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import Navbar from "../components/Navbar"
import TaskCard from "../components/TaskCard"

const HomePage = () => {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setTasks(res.data);
      } catch (error) {
        console.log("Eror fetching notes", error);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    } 

    fetchTasks()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading tasks...</div>}

        {tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <div>
                {/* component under components (formats each card) */}
                <TaskCard key={task._id} task={task} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage