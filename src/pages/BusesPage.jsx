import styles from "../styles/busespage.module.css";
import Bus from "../components/Bus";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

function BusesPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [overlay, setOverlay] = useState(false);

    function handleOverlay(){
        setOverlay(prev => !prev);
    }

    function handleChange(value){
      setFilter(value);
    }

    function handleFilter(){
      let filtered = data;
      // Filter by status
      if(filter !== "ALL") {
        filtered = filtered.filter((bus) => bus.status === filter);
      }

      setFilteredData(filtered);
    }

    useEffect(() => {
      handleFilter();
    }, [filter, data])

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="">
          <h2>Register A New Bus</h2>
          <div className={styles.inputBox}>
            <label htmlFor="make">Make</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="model">Model</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="plateNum">Plate Number</label>
            <input type="text" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="capacity">Capacity</label>
            <input type="number" min={10} />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="conductor">Assign Conductor</label>
            <select name="conductor" id="conductor">
              <option value="" selected>
                Select Conductor For This Bus
              </option>
              <option value={"1"}>Lawal Bello</option>
              <option value={"2"}>Auwal Muhammad</option>
              <option value={"3"}>Shamsu Babangida</option>
              <option value={"4"}>Suleiman Hamisu</option>
              <option value={"5"}>Aminu Sule</option>
              <option value={"6"}>Bello Muhammad</option>
              <option value={"7"}>Hamisu AbdulKadir</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="driver">Assign Driver</label>
            <select name="driver" id="driver">
              <option value="" selected>
                Select Driver For This Bus
              </option>
              <option value={"1"}>Lawal Bello</option>
              <option value={"2"}>Auwal Muhammad</option>
              <option value={"3"}>Shamsu Babangida</option>
              <option value={"4"}>Suleiman Hamisu</option>
              <option value={"5"}>Aminu Sule</option>
              <option value={"6"}>Bello Muhammad</option>
              <option value={"7"}>Hamisu AbdulKadir</option>
            </select>
          </div>
          <button>Register</button>
        </form>
      </div>
      <div className="header">
        <h2>Buses</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Total Buses</h2>
            <h3>15</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Bus Capacity</h2>
            <h3>250</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Bus Routes</h2>
            <h3>15</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Active Buses</h2>
            <h3>13</h3>
          </div>
          <div className={styles.card}>
            <h2>Total Inactive Buses</h2>
            <h3>2</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <div className="first">
              <h2>Filter By Capacity:</h2>
              <select name="filter" id="filter">
                <option value="1">0 - 20</option>
                <option value="2">20 - 30</option>
                <option value="2">30 - 40</option>
                <option value="2">40 - 50</option>
                <option value="2">50 - 60</option>
                <option value="2">60 - 70</option>
                <option value="2">70 - 80</option>
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
              Download Bus Data <Download style={{ marginLeft: "1rem" }}  size={20}/>
            </button>
            <button onClick={handleOverlay}>
              Register New Bus{" "}
              <PlusCircle style={{ marginLeft: "1rem" }} size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Buses</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>MAKE</th>
              <th>MODEL</th>
              <th>PLATE NO</th>
              <th>CAPACITY</th>
              <th>ROUTES</th>
              <th>DRIVER</th>
              <th>CONDUCTOR</th>
              <th>STATUS</th>
              <th colSpan={2}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <Bus
              id={"BS-123"}
              make={"Toyota"}
              model={"Hiace"}
              plate={"KSUSTA-BUS-05"}
              capacity={"18"}
              routes={"3"}
              driver={"Lawal Buhari"}
              conductor={"Bello Hashimu"}
              status={"ACTIVE"}
            />
            <Bus
              id={"BS-127"}
              make={"Toyota"}
              model={"Coaster"}
              plate={"KSUSTA-BUS-09"}
              capacity={"32"}
              routes={"1"}
              driver={"Suleiman Hamisu"}
              conductor={"Bello Abdulkadir"}
              status={"ACTIVE"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusesPage;
