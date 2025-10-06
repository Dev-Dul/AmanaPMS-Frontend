import styles from "../styles/usersoverview.module.css";
import UserOverview from "../components/UserOverView";
import { Download } from "lucide-react";

function UsersOverviewPage() {
  return (
    <div className="container">
      <div className="header">
        <h2>Users</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Users</h2>
            <h3>5000</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Staff</h2>
            <h3>1500</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Students</h2>
            <h3>3500</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Users</h2>
            <h3>4500</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Suspended Users</h2>
            <h3>500</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Role:</h2>
              <select name="filter" id="filter">
                <option value="1">Staff</option>
                <option value="2">Student</option>
              </select>
            </div>
            <div className="second">
              <h2>Filter By Status:</h2>
              <select name="filter_two" id="filter_two">
                <option value="ALL">ALL</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">SUSPENDED</option>
                <option value="EXPIRED">DELETED</option>
              </select>
            </div>
          </div>
          <div className={styles.left}>
            <button>
              Download User Data <Download style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>DEPT</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <UserOverview
              id={"2010203057"}
              name={"Abdulrahim Jamil"}
              role={"STUDENT"}
              dept={"Computer Science"}
              status={"ACTIVE"}
            />
            <UserOverview
              id={"2010203018"}
              name={"Lukman Kabiru Bala"}
              role={"STUDENT"}
              dept={"Computer Science"}
              status={"ACTIVE"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersOverviewPage;
