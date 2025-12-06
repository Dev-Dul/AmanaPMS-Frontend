import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthContext } from '../utils/context';
import { ScrollProvider } from '../utils/utils';
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useContext, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const { user, userLoad } = useContext(AuthContext);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const hideSidebar = location.pathname === '/' || location.pathname === '/signup' || location.pathname.startsWith('/posts/view/');


  if(userLoad) return <Loader />

  function handleToggle(){
    setToggle(prev => !prev);
  }

  return (
      <AnimatePresence mode="wait">
        <ScrollProvider>
          <div className={(!hideSidebar && !isMobile) ? "grid" : "mobile"}>
            {(!hideSidebar && !isMobile) ? <Sidebar role={user.role} handleToggle={handleToggle} /> : <Navbar role={user.role} showNav={hideSidebar} isMobile={isMobile} /> }
            <div>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className={`${toggle ? 'collapsed' : ''} ${'wrapper'}`}>
                <Outlet />
              </motion.div>
            </div>
          </div>
        </ScrollProvider>
      </AnimatePresence>
  );



}


export default App;
