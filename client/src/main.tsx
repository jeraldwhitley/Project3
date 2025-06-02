import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx'
import SignUp from './pages/Signup/index.js';
import Journal from './pages/Journal/index.js';
import NewEntry from './pages/NewEntry';
import Login from './pages/Login/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SignUp />
      },
      {
       path: 'login',
        element:<Login/>
      },
       {
        path: '/journal',
        element: <Journal />
      }, 
      {
        path: '/newentry',
        element: <NewEntry />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)