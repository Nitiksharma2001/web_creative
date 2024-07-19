import { createBrowserRouter } from "react-router-dom"
import Index from "../pages/Home/Index"

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
])
