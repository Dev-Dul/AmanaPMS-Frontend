import App from "./App";
import Error from "./components/Error";

// --- Top-level pages (no sidebar) ---
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LoginPage";

// --- App pages (with sidebar / dashboard layout) ---
import DrugsPage from "./pages/DrugsPage";
import ItemsPage from "./pages/ItemsPage";
import StaffPage from "./pages/StaffPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import RevenuePage from "./pages/RevenuePage";
import OverviewPage from "./pages/OverviewPage";
import UserDashboard from "./pages/UserDashboard";
import SalesAdminPage from "./pages/SalesAdminPage";
import NewPurchasePage from "./pages/NewPurchasePage";
import SalesHistoryPage from "./pages/SalesHistoryPage";
import TransactionPage from "./pages/TransactionPage";

const routes = [
  // --- Public routes (no sidebar) ---
  {
    path: "/",
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> }, // HomePage is the main entry
      { path: "login", element: <LogInPage /> },
    ],
  },

  // --- Protected / Dashboard routes (with sidebar) ---
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "staff", element: <StaffPage /> },
      { path: "items", element: <ItemsPage /> },
      { path: "drugs", element: <DrugsPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "new", element: <NewPurchasePage /> },
      { path: "revenue", element: <RevenuePage /> },
      { path: "overview", element: <OverviewPage /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "sales-admin", element: <SalesAdminPage /> },
      { path: "transactions", element: <TransactionPage /> },
      { path: "sales-history", element: <SalesHistoryPage /> },
    ],
  },
];

export default routes;
