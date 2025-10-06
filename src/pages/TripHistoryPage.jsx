
import styles from "../styles/tripshistory.module.css";
import Trip from "../components/Trip";
import { Download } from "lucide-react";

function TripHistoryPage() {
  return (
    <div className="container">
      <div className="header">
        <h2>Trips History</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.filter}>
          <div className="first">
            <h2>Filter By Month:</h2>
            <select name="filter" id="filter">
              <option value="0">All Months</option>
              <option value="1">1 Month Ago</option>
              <option value="2">2 Months Ago</option>
              <option value="3">3 Months Ago</option>
            </select>
          </div>
          <div className="second">
            <h2>Filter By Status:</h2>
            <select name="filter_two" id="filter_two">
              <option value="ALL">ALL</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="EXPIRED">EXPIRED</option>
            </select>
          </div>
        </div>
        <div className={styles.left}>
          <button>
            Download History <Download style={{ marginLeft: "1rem" }} />
          </button>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Trips</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TYPE</th>
              <th>ROUTE</th>
              <th>BUS STOP</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <Trip
              id={"tr-1249888yuibhj"}
              date={"Oct, 6th 2025"}
              type={"RETURN"}
              route={"School - BK"}
              stop={"AP2"}
              status={"EXPIRED"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TripHistoryPage;