import { useState } from "react";
import styles from "../styles/sidebar.module.css";
import { Home, User, CreditCard, UserPlus, Bus, MapPin, DollarSign, Scan, Menu, ArrowLeft, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ role, handleToggle }) {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Define items per role
  const menuItems = {
    STUDENT: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Clock />, label: "Trip History", path: "/trip-history" },
      {
        icon: <CreditCard />,
        label: "Transaction History",
        path: "/transactions",
      },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    STAFF: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Clock />, label: "Trip History", path: "/trip-history" },
      { icon: <CreditCard />, label: "Transaction History", path: "/transactions", },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    ADMIN: [
      { icon: <Home />, label: "Overview", path: "/overview" },
      { icon: <Bus />, label: "Buses", path: "/buses" },
      { icon: <MapPin />, label: "Routes", path: "/routes" },
      { icon: <DollarSign />, label: "Revenue", path: "/revenue" },
      { icon: <Clock />, label: "Trip Admin", path: "/trip-admin" },
      { icon: <UserPlus />, label: "Operators", path: "/operators" },
      { icon: <User />, label: "Users Overview", path: "/users" },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    DRIVER: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Scan />, label: "Scanner", path: "/scanner" },
      { icon: <Clock />, label: "Trip History", path: "/trip-history" },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    CONDUCTOR: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Scan />, label: "Scanner", path: "/scanner" },
      { icon: <Clock />, label: "Trip History", path: "/trip-history" },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
  };

  const items = menuItems[role] || [];

  function handleCollapse() {
    handleToggle();
    setCollapse((prev) => !prev);
  }

  return (
    <div className={`${styles.sidebar} ${collapse ? styles.collapsed : ""}`}>
      <div className={styles.top}>
        {collapse ? <h2 className={styles.logo}>S</h2> : <h2>SwiftRyde</h2>}
      </div>
      <div className="middle">
        {items.map((item, index) => (
          <div
            className={`${styles.icon} ${location.pathname === item.path ? styles.active : ''}`}
            key={index}
            onClick={() => navigate(item.path)}>
            {item.icon}
            {!collapse && item.label}
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className={`${styles.icon} ${styles.one}`} onClick={handleCollapse}>
          {!collapse ? <ArrowLeft /> : <Menu />}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
