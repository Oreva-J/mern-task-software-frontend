import TaskList from "./coponents/TaskList";
import { ToastContainer } from 'react-toastify'

export const URL = import.meta.env.VITE_BACKEND_URL

export default function App() {


  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center ">
      <div className="h-1/2 w-[70%] bg-white">
        <TaskList />
      </div>
      
      <ToastContainer />
    </div>
  )
}