import { ArrowRight, Wallet, Plus, ClipboardCopy, TrendingUp } from "lucide-react";
import styles from "../styles/userdashboard.module.css";
import TripPreview from "../components/TripPreview";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useFetchTodaysTrips } from "../../utils/fetch";
import { format, startOfToday } from "date-fns";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function UserDashboard() {
  const { user, userLoad } = useContext(AuthContext);
  const { trips, tripsLoading, tripsError } = useFetchTodaysTrips();

  const isPassenger = user?.role === "STUDENT" || user?.role === "STAFF"; // You can adapt this based on your logic

  if (userLoad) return <Loader />;
  if (!user || tripsError) return <Error />;

  // Format current date dynamically
  const today = format(new Date(), "EEE, MMM d yyyy");

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(user.accountNumber ?? "8069940628");
    toast.info("Account number copied!");
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
      </div>

      <div className={styles.top}>
        <h1 style={{ color: "#05f390" }}>Welcome Back!, {user.fullname}</h1>
        {isPassenger && (
          <p className={styles.sub}>Where are we headed today?</p>
        )}
      </div>

      <div className={styles.middle}>
        {isPassenger && (
          <div className={styles.acctBox}>
            <div className={styles.action}>
              <div className={styles.ft}>
                <div>
                  <h2 style={{ color: "#05f390" }}>
                    <Wallet className={styles.icon} /> Your Wallet
                  </h2>
                  <p>Acct Name: {user.fullname}</p>
                </div>
                <div>
                  <button>
                    Transaction History <ArrowRight className={styles.icon} />
                  </button>
                </div>
              </div>

              <div className={styles.mid}>
                <div>
                  <h3>Available Balance (NGN)</h3>
                  <h2 className={styles.amt} style={{ color: "#05f390" }}>
                    <span>N</span> {user?.wallet?.balance ?? 0}
                  </h2>
                </div>
                <div>
                  <button>
                    Add Money <Plus className={styles.icon} />
                  </button>
                </div>
              </div>

              <div className={styles.btm}>
                <h3>
                  Acct Number: {user.accountNumber ?? "8069940628"} (
                  {user.bankName ?? "Moniepoint"})
                </h3>
                <button onClick={copyAccountNumber}>
                  <ClipboardCopy className={styles.icon} /> Copy Account Number
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.tripBox}>
          <div className={styles.heading}>
            <h2>Total Trips</h2>
            <TrendingUp />
          </div>
          <h3>{user.trips?.length ?? 0}</h3>
          <p>Lifetime Trips Completed</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <h2>
          Trips {isPassenger ? "Available" : "Assigned"} Today ({today})
        </h2>

        <div className={styles.trips}>
          {trips && trips.length > 0 ? (
            trips.map((trip) => (
              <Link to={`/trips/${trip.id}`}>
                <TripPreview
                  key={trip.id}
                  title={trip.title ?? trip.route}
                  status={trip.status}
                  time={trip.time ?? "N/A"}
                />
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "1rem" }}>
              No trips available today
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
