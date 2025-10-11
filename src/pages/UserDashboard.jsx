import { ArrowRight, Wallet, Plus, ClipboardCopy, TrendingUp, LocateFixedIcon } from "lucide-react";
import styles from "../styles/userdashboard.module.css";
import TripPreview from "../components/TripPreview";

function UserDashboard() {
  const role = "CONDUCTOR";
  const isPassenger = role === "STUDENT" || role === "STAFF";

  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
      </div>
      <div className={styles.top}>
        <h1>Welcome Back!, Abdulrahim</h1>
        {isPassenger && (
          <p className={styles.sub}>Where Are we headed today?</p>
        )}
      </div>
      <div className={styles.middle}>
        {isPassenger && (
          <div className={styles.acctBox}>
            <div className={styles.action}>
              <div className={styles.ft}>
                <div>
                  <h2>
                    <Wallet className={styles.icon} /> Your Wallet
                  </h2>
                  <p>Acct Name: Abdulrahim Jamil</p>
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
                  <h2 className={styles.amt}>
                    <span>N</span> 2000
                  </h2>
                </div>
                <div>
                  <button>
                    Add Money <Plus className={styles.icon} />
                  </button>
                </div>
              </div>
              <div className={styles.btm}>
                <h3>Acct Number: 8069940628 (Moniepoint)</h3>
                <button>
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
          <h3>20</h3>
          <p>Lifetime Trips Completed</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <h2>
          Trips {isPassenger ? "Available" : "Assigned"} Today (SUN, Oct., 5
          2025).
        </h2>
        <div className={styles.trips}>
          <TripPreview title={"AFU-123"} status={"ACTIVE"} time={"6:30 AM"} />
          <TripPreview title={"AFU-125"} status={"ACTIVE"} time={"6:30 AM"} />
          <TripPreview title={"AFU-127"} status={"ACTIVE"} time={"6:30 AM"} />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
