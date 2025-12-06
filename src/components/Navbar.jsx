import { Home, User, UserCog, Pill, Briefcase, Tag,  UserPlus, Plus, DollarSign, Clock } from "lucide-react";
import styles from "../styles/navbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../utils/utils";

function Navbar({ role, showNav, isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isScrolling } = useContext(ScrollContext);

  // 🧭 Define navigation items per role (same as Sidebar)
  const menuItems = {
    STAFF: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Clock />, label: "Sales History", path: "/sales-history" },
      { icon: <Plus />, label: "New Sale", path: "/new" },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    ADMIN: [
      { icon: <Home />, label: "Overview", path: "/overview" },
      { icon: <Clock />, label: "Sales History", path: "/sales-history" },
      { icon: <Plus />, label: "New Sale", path: "/new" },
      { icon: <UserCog />, label: "Admin", path: "/admin" },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <div className={`${styles.navbar} ${!showNav && isMobile ? styles.show : ""} ${isScrolling ? styles.scroll : ""}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${styles.icon} ${location.pathname === item.path ? styles.active : "" }`}
          style={{ "--i": index + 1 }}
          onClick={() => navigate(item.path)}>
          {item.icon}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
