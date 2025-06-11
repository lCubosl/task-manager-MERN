import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const TasksNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No tasks yet</h3>
      
      <Link to="/create" className="btn btn-primary">
        Create task
      </Link>
    </div>
  );
};

export default TasksNotFound