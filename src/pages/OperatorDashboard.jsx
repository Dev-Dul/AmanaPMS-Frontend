import styles from "../styles/userdashboard.module.css";
import { ArrowRight } from "lucide-react";
import TripPreview from "../components/TripPreview";

function OperatorDashboard() {
  return (
    <div className="container">
      <div className="header">
        <h2>Dashboard</h2>
      </div>
      <div className={styles.top}>
        <h1>Welcome Back!, Danladi</h1>
      </div>
      <div className={styles.middle}>
        <div className={styles.acctBox}>
          <h2>Details</h2>
          <div className={styles.action}>
            <div className={styles.left}>
              <h3>Bus assigned</h3>
              <h2>KSUSTA-BS-001</h2>
            </div>
            <div className={styles.right}>
              <h3>
                Trip History{" "}
                <ArrowRight size={20} className={styles.arrow} />
              </h3>
              <button>View Current Trip</button>
            </div>
          </div>
        </div>
        <div className={styles.tripBox}>
          <h2>Total Trips</h2>
          <h3>20</h3>
        </div>
      </div>
      <div className={styles.bottom}>
        <h2>Trips Assigned Today (SUN, Oct., 5 2025). </h2>
        <div className={styles.trips}>
          <TripPreview title={"AFU-123"} status={"ACTIVE"} time={"6:30 AM"} />
          <TripPreview title={"AFU-125"} status={"ACTIVE"} time={"6:30 AM"} />
          <TripPreview title={"AFU-127"} status={"ACTIVE"} time={"6:30 AM"} />
        </div>
      </div>
    </div>
  );
}

export default OperatorDashboard;
