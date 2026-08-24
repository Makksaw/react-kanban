import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { FaTrashAlt } from "react-icons/fa"
import { RxDragHandleDots1 } from "react-icons/rx"
import tasksData from "./data/tasks"
import columns from "./data/columns"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState(tasksData)

  const [newTask, setNewTask] = useState("")
  const [draggedTask, setDraggedTask] = useState({})

  function handleSubmitTask(e) {
    e.preventDefault()

    if (!newTask.trim()) return
    setTasks([...tasks, { id: uuidv4(), title: newTask, status: "todo" }])
    setNewTask("")
  }

  function dragStartTask(task) {
    setDraggedTask(task)
  }

  function dropTask(status) {
    setTasks(
      tasks.map((task) => {
        return task.id === draggedTask.id ? { ...task, status } : task
      }),
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="app">
      <h2>Kanban</h2>
      <form onSubmit={handleSubmitTask} className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="columns">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id)
          return (
            <div
              className="column"
              key={column.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dropTask(column.id)}
            >
              <h2>{column.title}</h2>
              <div className="tasks">
                {columnTasks.map((task) => (
                  <div
                    className="task"
                    key={task.id}
                    draggable
                    onDragStart={() => dragStartTask(task)}
                  >
                    <span>{task.title}</span>
                    <RxDragHandleDots1 />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="delete-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => deleteTask(draggedTask.id)}
      >
        <FaTrashAlt />
      </div>
    </div>
  )
}

export default App
