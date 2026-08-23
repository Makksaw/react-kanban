import { v4 as uuidv4 } from "uuid"

const tasks = [
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
]

export default tasks
