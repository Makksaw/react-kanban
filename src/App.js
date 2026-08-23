import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

const columns = [
  { id: "todo", title: "Todo" },
  { id: "progress", title: "In Progress" },
  { id: "done", title: "Done" },
]

function App() {
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      title: "Learn React",
      status: "todo",
    },
    {
      id: uuidv4(),
      title: "Feed Cat",
      status: "progress",
    },
    {
      id: uuidv4(),
      title: "Learn TypeScript",
      status: "done",
    },
    {
      id: uuidv4(),
      title: "Create new project",
      status: "todo",
    },
    {
      id: uuidv4(),
      title: "Go for a walk",
      status: "progress",
    },
  ])

  const [newTask, setNewTask] = useState("")
  const [draggedTask, setDraggedTask] = useState({})

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function handleSubmitTask(e) {
    e.preventDefault()

    if (!newTask.trim()) return
    setTasks([...tasks, { id: uuidv4(), title: newTask, status: "todo" }])
    setNewTask("")
  }

  function dragStartTask(task) {
    setDraggedTask(task)
  }

  function dropTask(e, status) {
    e.preventDefault()
    setTasks(
      tasks.map((task) => {
        return task.id === draggedTask.id ? { ...task, status } : task
      }),
    )
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
          const filteredColumnTasks = tasks.filter(
            (task) => task.status === column.id,
          )
          return (
            <div
              className="column"
              key={column.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => dropTask(e, column.id)}
            >
              <h2>{column.title}</h2>
              <div className="tasks">
                {filteredColumnTasks.map((task) => (
                  <div
                    className="task"
                    key={task.id}
                    draggable
                    onDragStart={() => dragStartTask(task)}
                  >
                    <span>{task.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
