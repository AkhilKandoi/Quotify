import Signup from './pages/signup.jsx'
import Home from './pages/Home.jsx'
import './pages/Home.css'
import Signin from './pages/Signin.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  
  const router = createBrowserRouter([
    {
      path:'/',
      element: <Signup/>
    },
    {
      path:'/home',
      element:<Home/>
    },
    {
      path:'/signin',
      element:<Signin/>
    }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
