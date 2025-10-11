import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import styles from "../styles/revenuepage.module.css";
import Week from "../components/Week";
import { Download, PlusCircle, XCircle, BusIcon } from "lucide-react";
import { useEffect, useState } from "react";

function TripAdminPage() {
  const [tab, setTab] = useState(1);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [monthFilter, setMonthFilter] = useState("0");
  
    function handleMonthChange(e){
      setMonthFilter(e.target.value);
    }

    function handleFilter(){
    let filtered = data;
    if(monthFilter !== "0") {
      const now = new Date();
      let startDate, endDate;

      if(monthFilter === "4") {
        // Last Year
        const lastYear = subYears(now, 1);
        startDate = startOfYear(lastYear);
        endDate = endOfYear(lastYear);
      } else {
        // Past X months
        const monthsAgo = parseInt(monthFilter);
        startDate = subMonths(now, monthsAgo);
        endDate = now;
      }

      filtered = filtered.filter((trp) => {
        const txDate = parseISO(trp.created);
        return isAfter(txDate, startDate) && isBefore(txDate, endDate);
      });
    }

    setFilteredData(filtered);

  }

  useEffect(() => {
    handleFilter();
  }, [monthFilter, data]);

  function handleOverlay() {
    setOverlay((prev) => !prev);
  }

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  function handleTab(num) {
    setTab(num);
  }

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" className={`${styles.one} ${tab === 1 ? styles.active : ""}`}>
          <h2>Create New Trip</h2>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
              </option>
              <option value={"1"}>School - Aleiro (Custom)</option>
              <option value={"1"}>School - Aleiro (Gadan Audu)</option>
              <option value={"1"}>School - Aleiro (Kashin Zama)</option>
              <option value={"1"}>School - Aleiro (Lemi)</option>
              <option value={"1"}>School - Jega (Old BLB)</option>
              <option value={"1"}>School - Jega (EcoBank)</option>
              <option value={"1"}>School - BK (AP2)</option>
              <option value={"1"}>School - BK (Halliru Abdu)</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <button type="button">Create Trip</button>
        </form>
      </div>
      <div className={`${styles.overlayTwo} ${open ? styles.active : ""} ${styles.two}`}>
        <XCircle className={styles.close} onClick={handleOpen} />
        <form action="" className={`${styles.one} ${tab === 1 ? styles.active : ""}`}>
          <h2>Create Trips For Today (Morning)</h2>
          <h3>Trip One</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
              </option>
              <option value={"1"}>School - Aleiro (Custom)</option>
              <option value={"1"}>School - Aleiro (Gadan Audu)</option>
              <option value={"1"}>School - Aleiro (Kashin Zama)</option>
              <option value={"1"}>School - Aleiro (Lemi)</option>
              <option value={"1"}>School - Jega (Old BLB)</option>
              <option value={"1"}>School - Jega (EcoBank)</option>
              <option value={"1"}>School - BK (AP2)</option>
              <option value={"1"}>School - BK (Halliru Abdu)</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <h3>Trip Two</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
              </option>
              <option value={"1"}>School - Aleiro (Custom)</option>
              <option value={"1"}>School - Aleiro (Gadan Audu)</option>
              <option value={"1"}>School - Aleiro (Kashin Zama)</option>
              <option value={"1"}>School - Aleiro (Lemi)</option>
              <option value={"1"}>School - Jega (Old BLB)</option>
              <option value={"1"}>School - Jega (EcoBank)</option>
              <option value={"1"}>School - BK (AP2)</option>
              <option value={"1"}>School - BK (Halliru Abdu)</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <button type="button" onClick={() => handleTab(2)}>
            Next
          </button>
        </form>
        <form action="" className={`${styles.one} ${tab === 2 ? styles.active : ""}`}>
          <h2>Create Trips For Today (Afternoon)</h2>
          <h3>Trip One</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
              </option>
              <option value={"1"}>School - Aleiro (Custom)</option>
              <option value={"1"}>School - Aleiro (Gadan Audu)</option>
              <option value={"1"}>School - Aleiro (Kashin Zama)</option>
              <option value={"1"}>School - Aleiro (Lemi)</option>
              <option value={"1"}>School - Jega (Old BLB)</option>
              <option value={"1"}>School - Jega (EcoBank)</option>
              <option value={"1"}>School - BK (AP2)</option>
              <option value={"1"}>School - BK (Halliru Abdu)</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <h3>Trip Two</h3>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route for the Trip
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop for the Trip
              </option>
              <option value={"1"}>School - Aleiro (Custom)</option>
              <option value={"1"}>School - Aleiro (Gadan Audu)</option>
              <option value={"1"}>School - Aleiro (Kashin Zama)</option>
              <option value={"1"}>School - Aleiro (Lemi)</option>
              <option value={"1"}>School - Jega (Old BLB)</option>
              <option value={"1"}>School - Jega (EcoBank)</option>
              <option value={"1"}>School - BK (AP2)</option>
              <option value={"1"}>School - BK (Halliru Abdu)</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="time">Set Departure Time</label>
            <input type="time" />
          </div>
          <button type="button" onClick={() => handleTab(1)}>
            Back
          </button>
          <button>Create Trips</button>
        </form>
      </div>
      <div className="header">
        <h2>Trips</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>All Time Trips</h2>
            <h3>15,000, 000</h3>
          </div>
          <div className={styles.card}>
            <h2>Trips For Last Month</h2>
            <h3>250,000</h3>
          </div>
          <div className={styles.card}>
            <h2>Trips For Last Week</h2>
            <h3>10</h3>
          </div>
          <div className={styles.card}>
            <h2>Trips Per User</h2>
            <h3>15</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <button type="button" onClick={handleOverlay}>
              Create Single Trip <BusIcon style={{ marginLeft: "1rem" }} />
            </button>
            <div className={styles.filterTop}>
              <div className="first">
                <h2>Filter By Month:</h2>
                <select name="filter" id="filter" onChange={handleMonthChange}>
                  <option value="0">All Time</option>
                  <option value="1">A Month Ago</option>
                  <option value="2">2 Months Ago</option>
                  <option value="3">3 Months Ago</option>
                  <option value="4">Last Year</option>
                </select>
              </div>
              <div className="second">
                <h2>Filter By Trip Amount:</h2>
                <select name="filter_two" id="filter_two">
                  <option value="ALL">ALL</option>
                  <option value="LEAST">LEAST</option>
                  <option value="MONTH">MOST</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.left}>
            <button>
              Download Trip Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOpen}>
              Schedule Trips For Today{" "}
              <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Trip History (By Weeks)</h3>
        <table>
          <thead>
            <tr>
              <th>WEEK</th>
              <th>START</th>
              <th>END</th>
              <th>TOTAL TRIPS</th>
              <th>TOTAL PASSENGERS</th>
            </tr>
          </thead>
          <tbody>
            <Week
              num={"23"}
              start={"5th Sept., 2025"}
              end={"12th Sept., 2025"}
              trips={"15"}
              passengers={"1000"}
              type={"TRIP"}
            />
            <Week
              num={"24"}
              start={"12th Sept., 2025"}
              end={"19th Sept., 2025"}
              trips={"25"}
              passengers={"2000"}
              type={"TRIP"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TripAdminPage;
