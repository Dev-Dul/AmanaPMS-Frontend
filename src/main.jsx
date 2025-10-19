import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import routes from './routes.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../utils/context.jsx';
import { Toaster } from 'sonner';

const router = createBrowserRouter(routes);
{/* <App /> */}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />;
    </AuthProvider>
  </StrictMode>
);
