import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import TaskDetailPage from "./pages/TaskDetailPage"

//import toast from "react-hot-toast"

const App = () => {
  return (
    // themes: ["light", "dark", "cupcake", "emerald", "cmyk", "pastel", "black", "lofi", "sunset", "nord", "lemonade"]
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#eee_60%,#00bfff80_100%)]" />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<TaskDetailPage />} />
      </Routes>
    </div>
  )
}

export default App