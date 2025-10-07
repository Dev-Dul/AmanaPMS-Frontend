import styles from "../styles/routespage.module.css";
import Route from "../components/Route";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useState } from "react";

function RoutesPage() {
    const [stops, setStops] = useState([]);
    const [overlay, setOverlay] = useState(false);

    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleStops(){
        setStops([...stops, ""])
    }

    function handleChange(index, value){
        const newInputs = [...stops];
        newInputs[index] = value;
        setStops(newInputs);
    }

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="">
          <h2>Register A New Route</h2>
          <div className={styles.inputBox}>
            <label htmlFor="name">Route Name</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="start">Starting Point</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="end">End Point</label>
            <input type="text" />
          </div>
          <div className={`${styles.inputBox} ${styles.two}`}>
            <label htmlFor="stops">Bus Stops</label>
            {stops.map((stop, index) => (
              <input
                key={index}
                type="text"
                value={stop}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
            <button type="button" className={styles.new} onClick={handleStops}>
              Add New Bus Stop <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
          <button>Register</button>
        </form>
      </div>
      <div className="header">
        <h2>Routes</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Routes</h2>
            <h3>15</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Routes</h2>
            <h3>13</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Inactive Routes</h2>
            <h3>2</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Bus Stops</h2>
            <h3>25</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Bus Stops:</h2>
              <select name="filter" id="filter">
                <option value="1">0 - 10</option>
                <option value="2">10 - 20</option>
                <option value="2">20 - 30</option>
              </select>
            </div>
            <div className="second">
              <h2>Filter By Status:</h2>
              <select name="filter_two" id="filter_two">
                <option value="ALL">ALL</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">INACTIVE</option>
                <option value="EXPIRED">DELETED</option>
              </select>
            </div>
          </div>
          <div className={styles.left}>
            <button>
              Download Route Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOverlay}>
              Register New Route <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Routes</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ST. POINT</th>
              <th>END POINT</th>
              <th>BUS STOPS</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <Route
              id={"RT-123"}
              name={"School - BK"}
              start={"School"}
              end={"Birnin Kebbi"}
              stops={6}
              status={"ACTIVE"}/>
            <Route
              id={"RT-127"}
              name={"Bk - School"}
              start={"Birnin Kebbi"}
              end={"School"}
              stops={6}
              status={"ACTIVE"}/>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoutesPage;
