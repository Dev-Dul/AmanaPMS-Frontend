import styles from "../styles/operatorpage.module.css";
import Operator from "../components/Operator";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

function OperatorPage() {
    const [data, setData] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [statFilter, setStatFilter] = useState("ALL");
    const [roleFilter, setRoleFilter] = useState("ALL");
    
    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleStatChange(e){
      setStatFilter(e.target.value);
    }

    function handleRoleChange(e){
      setRoleFilter(e.target.value);
    }

    function handleFilter() {
      let filtered = data;
      // Filter by status
      if(statFilter !== "ALL") filtered = filtered.filter((opr) => opr.status === statFilter);
      if(roleFilter !== "ALL") filtered = filtered.filter((opr) => opr.role === roleFilter);

      setFilteredData(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [statFilter, roleFilter, data])

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="">
          <h2>Register A New Operator</h2>
          <div className={styles.inputBox}>
            <label htmlFor="fullname">Fullname</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="staffId">Staff ID</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="role">Assign Role</label>
            <select name="role" id="role">
              <option value="" selected>
                Select Opearator Role
              </option>
              <option value={"1"}>Driver</option>
              <option value={"2"}>Conductor</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="role">Assign Bus</label>
            <select name="role" id="role">
              <option value="" selected>
                Select Bus For Operator
              </option>
              <option value={"1"}>KSUSTA-BUS-01</option>
              <option value={"2"}>KSUSTA-BUS-02</option>
              <option value={"3"}>KSUSTA-BUS-03</option>
              <option value={"4"}>KSUSTA-BUS-04</option>
              <option value={"5"}>KSUSTA-BUS-05</option>
              <option value={"6"}>KSUSTA-BUS-06</option>
              <option value={"7"}>KSUSTA-BUS-07</option>
            </select>
          </div>
          <button>Register</button>
        </form>
      </div>
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
              <select name="filter" id="filter" onChange={handleRoleChange}>
                <option value="0">ALL</option>
                <option value="1">DRIVER</option>
                <option value="2">CONDUCTOR</option>
              </select>
            </div>
            <div className="second">
              <h2>Filter By Status:</h2>
              <select name="filter_two" id="filter_two" onChange={handleStatChange}>
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
            <button onClick={handleOverlay}>
              Register New Operator{" "}
              <PlusCircle style={{ marginLeft: "1rem" }} />
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
