import { useEffect, useState } from "react"
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

  const [width, setWidth] = useState(window.innerWidth)

  function handleChangeWidth() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener("resize", handleChangeWidth)
    return () => window.removeEventListener("resize", handleChangeWidth)
  }, [])

  const isMobile = width <= 768

  function moveTaskBack(currentTask) {
    const currentColumnIndex = columns.findIndex(
      (column) => column.id === currentTask.status,
    )

    if (currentColumnIndex === 0) return

    const previousColumn = columns[currentColumnIndex - 1]

    setTasks(
      tasks.map((task) => {
        return task.id === currentTask.id
          ? { ...task, status: previousColumn.id }
          : task
      }),
    )
  }

  function moveTaskForward(currentTask) {
    const currentColumnIndex = columns.findIndex(
      (column) => column.id === currentTask.status,
    )

    if (currentColumnIndex === columns.length - 1) return

    const nextColumn = columns[currentColumnIndex + 1]

    setTasks(
      tasks.map((task) => {
        return task.id === currentTask.id
          ? { ...task, status: nextColumn.id }
          : task
      }),
    )
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
                    <span className="task-move-controls">
                      {isMobile ? (
                        <>
                          {columns.findIndex(
                            (column) => column.id === task.status,
                          ) === 0 ? (
                            ""
                          ) : (
                            <button
                              className="task-move-btn"
                              onClick={() => moveTaskBack(task)}
                            >
                              ←
                            </button>
                          )}

                          {columns.findIndex(
                            (column) => column.id === task.status,
                          ) ===
                          columns.length - 1 ? (
                            ""
                          ) : (
                            <button
                              className="task-move-btn"
                              onClick={() => moveTaskForward(task)}
                            >
                              →
                            </button>
                          )}
                          <div
                            className="task-delete-btn"
                            onClick={() => deleteTask(task.id)}
                          >
                            <FaTrashAlt />
                          </div>
                        </>
                      ) : (
                        <RxDragHandleDots1 />
                      )}
                    </span>
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
