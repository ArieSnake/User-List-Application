import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserList } from './pages/user-list.tsx'
import { AddUser } from './pages/add-user.tsx'
import { Layout } from './pages/layout.tsx'
import { User } from './pages/user.tsx'
const router = createBrowserRouter([
 {
  path:'',
  element:<Layout/>,
  children: [
    {path:'',element:<UserList/>},
    {path:'add',element:<AddUser/>},
    {path:'/user/:id',element:<User/>}
    
  ]
 },
 {
  path: 'add',
  element:<AddUser/>
 }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
