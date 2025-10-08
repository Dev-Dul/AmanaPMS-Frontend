import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import routes from './routes.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// const router = createBrowserRouter(routes);
{/* <RouterProvider router={router} />; */}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
