import App from "./App";
import Error from "./components/Error";

// --- Top-level pages (no sidebar) ---
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// --- App pages (with sidebar / dashboard layout) ---
import OverviewPage from "./pages/OverviewPage";
import UserDashboard from "./pages/UserDashboard";
import TripPage from "./pages/TripPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionPage from "./pages/TransactionPage";
import TripHistoryPage from "./pages/TripHistoryPage";
import UsersOverviewPage from "./pages/UsersOverviewPage";
import OperatorPage from "./pages/OperatorPage";
import BusesPage from "./pages/BusesPage";
import RoutesPage from "./pages/RoutesPage";
import RevenuePage from "./pages/RevenuePage";
import TripAdminPage from "./pages/TripAdminPage";
import ScannerPage from "./pages/ScannerPage";

const routes = [
  // --- Public routes (no sidebar) ---
  {
    path: "/",
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> }, // HomePage is the main entry
      { path: "login", element: <LogInPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },

  // --- Protected / Dashboard routes (with sidebar) ---
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "overview", element: <OverviewPage /> },
      { path: "dashboard", element: <UserDashboard /> },
      { path: "trips/:tripId", element: <TripPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "transactions", element: <TransactionPage /> },
      { path: "trip-history", element: <TripHistoryPage /> },
      { path: "users", element: <UsersOverviewPage /> },
      { path: "operators", element: <OperatorPage /> },
      { path: "buses", element: <BusesPage /> },
      { path: "routes", element: <RoutesPage /> },
      { path: "revenue", element: <RevenuePage /> },
      { path: "trip-admin", element: <TripAdminPage /> },
      { path: "scanner", element: <ScannerPage /> },
    ],
  },
];

export default routes;
