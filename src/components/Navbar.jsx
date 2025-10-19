import styles from "../styles/navbar.module.css";
import { Home, User, CreditCard, List, UserPlus, Bus, MapPin, DollarSign, Scan, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ScrollContext } from "../../utils/utils";

function Navbar({ role, showNav, isMobile }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isScrolling } = useContext(ScrollContext);

  // 🧭 Define navigation items per role (same as Sidebar)
  const menuItems = {
    STUDENT: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Clock />, label: "Trip History", path: "/trip-history" },
      {
        icon: <CreditCard />,
        label: "Transactions",
        path: "/transaction-history",
      },
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    STAFF: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Clock />, label: "Trip History", path: "/trip-history" },
      { icon: <CreditCard />, label: "Transactions",  path: "/transaction-history"},
      { icon: <User />, label: "Profile", path: "/profile" },
    ],
    ADMIN: [
      { icon: <Home />, label: "Overview", path: "/overview" },
      { icon: <User />, label: "Users", path: "/users" },
      { icon: <UserPlus />, label: "Operators", path: "/operators" },
      { icon: <Bus />, label: "Buses", path: "/buses" },
      { icon: <MapPin />, label: "Routes", path: "/routes" },
      { icon: <DollarSign />, label: "Revenue", path: "/revenue" },
      { icon: <Clock />, label: "Trip Admin", path: "/trip-admin" },
    ],
    OPERATOR: [
      { icon: <Home />, label: "Dashboard", path: "/dashboard" },
      { icon: <Scan />, label: "Scanner", path: "/scanner" },
      { icon: <User />, label: "Profile", path: "/profile" },
      { icon: <Clock />, label: "Trip History", path: "/trip-history" },
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
