import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '../utils/context';
import { ScrollProvider, ScrollContext } from '../utils/utils';
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import SignupPage from './pages/SignupPage';
import LogInPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import TripPage from './pages/TripPage';
import ProfilePage from './pages/ProfilePage';
import TransactionPage from './pages/TransactionPage';
import TripHistoryPage from './pages/TripHistoryPage';
import UsersOverviewPage from './pages/UsersOverviewPage';
import OperatorPage from './pages/OperatorPage';
import BusesPage from './pages/BusesPage';
import RoutesPage from './pages/RoutesPage';
import RevenuePage from './pages/RevenuePage';
import TripAdminPage from './pages/TripAdminPage';
import OperatorDashboard from './pages/OperatorDashboard';

function App() {
  // const location = useLocation();
  // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // const hideSidebar = location.pathname === '/' || location.pathname === '/signup' || location.pathname.startsWith('/posts/view/');


  // return (
  //   <AuthProvider>
  //     <Toaster richColors position="top-right" />
  //     <AnimatePresence mode="wait">
  //       <ScrollProvider>
  //         <div className={(!hideSidebar && !isMobile) ? "grid" : "mobile"}>
  //           {(!hideSidebar && !isMobile) ? <Sidebar /> : <Navbar showNav={hideSidebar} isMobile={isMobile} /> }
  //           <div>
  //             <motion.div
  //               key={location.pathname}
  //               initial={{ opacity: 0, x: 50 }}
  //               animate={{ opacity: 1, x: 0 }}
  //               exit={{ opacity: 0, x: -50 }}
  //               transition={{ duration: 0.8 }}
  //               className='wrapper'>
  //               <Outlet />
  //             </motion.div>
  //           </div>
  //         </div>
  //       </ScrollProvider>
  //     </AnimatePresence>
  //   </AuthProvider>
  // );

  return (
    <UserDashboard />
  )

}


export default App;
