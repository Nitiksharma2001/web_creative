import { createBrowserRouter } from "react-router-dom"
import Draggable from "../pages/draggable/Draggable"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Draggable />,
  },
])
