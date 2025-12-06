import { useState } from "react";
import styles from "../styles/sidebar.module.css";
import { Home, User, Briefcase, Pill, Tag, CreditCard, UserPlus, Bus, MapPin, DollarSign, Plus ,Menu, ArrowLeft, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ role, handleToggle }) {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Define items per role
  const menuItems = {
    STAFF: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Clock />, label: "Sales History", path: "/sales-history" },
      { icon: <Plus />, label: "New Sale", path: "/new" },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    ADMIN: [
      { icon: <Home />, label: "Overview", path: "/overview" },
      { icon: <DollarSign />, label: "Revenue", path: "/revenue" },
      { icon: <Pill />, label: "Drugs", path: "/drugs" },
      { icon: <Plus />, label: "New Sale", path: "/new" },
      { icon: <Tag />, label: "Items", path: "/items" },
      { icon: <Briefcase />, label: "Sales Admin", path: "/sales-admin" },
      { icon: <UserPlus />, label: "Staff", path: "/staff" },
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
        {collapse ? <h2 className={styles.logo}>A</h2> : <h2>Al-AMANA PMS</h2>}
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
