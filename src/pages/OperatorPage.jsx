import styles from "../styles/operatorpage.module.css";
import Operator from "../components/Operator";
import { Download, PlusCircle } from "lucide-react";

function OperatorPage() {
  return (
    <div className="container">
      <div className="header">
        <h2>Operators</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Operators</h2>
            <h3>15</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Drivers</h2>
            <h3>10</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Conductors</h2>
            <h3>5</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Operators</h2>
            <h3>15</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Suspended Operators</h2>
            <h3>0</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Role:</h2>
              <select name="filter" id="filter">
                <option value="1">Driver</option>
                <option value="2">Conductor</option>
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
              Download Operator Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button>
              Register New Operator <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Opearators</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>BUS</th>
              <th>DATE HIRED</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <Operator
              id={"KSUSTA-0P-12"}
              name={"Isiyaka Lawal"}
              role={"DRIVER"}
              bus={"KSUSTA-BUS-05"}
              date={"18-02-2020"}
              status={"ACTIVE"}
            />
            <Operator
              id={"KSUSTA-0P-18"}
              name={"Ibrahim Babangida"}
              role={"CONDUCTOR"}
              bus={"KSUSTA-BUS-09"}
              date={"18-02-2022"}
              status={"ACTIVE"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OperatorPage;
