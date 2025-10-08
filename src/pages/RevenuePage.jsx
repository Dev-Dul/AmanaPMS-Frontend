import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import styles from "../styles/revenuepage.module.css";
import Week from "../components/Week";
import Ticket from "../components/Ticket";
import { Download, PlusCircle, XCircle, TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";

function RevenuePage() {
  const [tab, setTab] = useState(1);
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [monthFilter, setMonthFilter] = useState("0");

  function handleOverlay() {
    setOverlay((prev) => !prev);
  }

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  function handleTab(num) {
    setTab(num);
  }

  function handleMonthChange(e) {
    setMonthFilter(e.target.value);
  }

  function handleFilter() {
    let revenue = data;

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

      revenue = revenue.filter((rv) => {
        const rvDate = parseISO(rv.created);
        return isAfter(rvDate, startDate) && isBefore(rvDate, endDate);
      });
    }

    setFilteredData(revenue);

  }

  useEffect(() => {
    handleFilter();
  }, [monthFilter, data]);

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <form action="" className={`${styles.one} ${tab === 1 ? styles.active : ""}`}>
          <h2>Review Ticket Sales</h2>
          <div className={styles.inputBox}>
            <label htmlFor="route">Choose A Route </label>
            <select name="route" id="route">
              <option value="" selected>
                Select a Route to Reveiw
              </option>
              <option value={"1"}>School - Birnin Kebbi</option>
              <option value={"2"}>Birnin Kebbi - School</option>
            </select>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="stop">Choose A Bus Stop </label>
            <select name="stop" id="stop">
              <option value="" selected>
                Select a Bus Stop to Reveiw
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
          <button type="button" onClick={() => handleTab(2)}>
            Next
          </button>
        </form>
        <form action="" className={`${tab === 2 ? styles.active : ""}`}>
          <h2>Review Ticket Prices For Route A</h2>
          <h3>Current Price - N700</h3>
          <div className={styles.inputBox}>
            <label htmlFor="new">New Price</label>
            <input type="text" id="new" />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="date">Effective Date</label>
            <input type="date" id="date" />
          </div>
          <button type="button" onClick={() => handleTab(1)}>
            Back
          </button>
          <button>Update Price</button>
        </form>
      </div>
      <div className={`${styles.overlayTwo} ${open ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOpen} />
        <div className={styles.middle}>
          <h3>Current Ticket Prices</h3>
          <table>
            <thead>
              <tr>
                <th>ROUTE</th>
                <th>BUS STOP</th>
                <th>PRICE</th>
                <th>LAST REVIEW DATE</th>
              </tr>
            </thead>
            <tbody>
              <Ticket
                route={"School - Birnin Kebbi"}
                stop={"School - Kashin Zama"}
                price={"100"}
                lastUpdate={"2nd Sept., 2024"}
              />
              <Ticket
                route={"School - Birnin Kebbi"}
                stop={"School - AP2"}
                price={"700"}
                lastUpdate={"2nd Sept., 2024"}
              />
              <Ticket
                route={"School - Birnin Kebbi"}
                stop={"School - Kalgo"}
                price={"500"}
                lastUpdate={"2nd Sept., 2024"}
              />
              <Ticket
                route={"School - Birnin Kebbi"}
                stop={"School - Jega"}
                price={"150"}
                lastUpdate={"2nd Sept., 2023"}
              />
              <Ticket
                route={"School - Birnin Kebbi"}
                stop={"School - Aleiro (Custom)"}
                price={"50"}
                lastUpdate={"2nd Aug., 2023"}
              />
            </tbody>
          </table>
        </div>
      </div>
      <div className="header">
        <h2>Revenue</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>All Time Generated Revenue</h2>
            <h3>150, 000, 000</h3>
          </div>
          <div className={styles.card}>
            <h2>Last Month's Revenue</h2>
            <h3>250,000</h3>
          </div>
          <div className={styles.card}>
            <h2>All Time Tickets Sold</h2>
            <h3>300, 000, 000</h3>
          </div>
          <div className={styles.card}>
            <h2>Last Month's Ticket Sales</h2>
            <h3>13, 000, 000</h3>
          </div>
          <div className={styles.card}>
            <h2>Revenue Per User</h2>
            <h3>2,000, 000</h3>
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
            <button type="button" onClick={handleOpen}>
              View Current Ticket Prices{" "}
              <TicketIcon style={{ marginLeft: "1rem" }} />
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
                <h2>Filter By Tickets Sold:</h2>
                <select name="filter_two" id="filter_two">
                  <option value="ALL">ALL</option>
                  <option value="LEAST">LEAST</option>
                  <option value="MOST">MOST</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.left}>
            <button>
              Download Revenue Data <Download style={{ marginLeft: "1rem" }} />
            </button>
            <button onClick={handleOverlay}>
              Review Ticket Price <PlusCircle style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Revenue Breakdown (By Weeks)</h3>
        <table>
          <thead>
            <tr>
              <th>WEEK</th>
              <th>START</th>
              <th>END</th>
              <th>TOTAL REVENUE</th>
              <th>TOTAL TICKET SALES</th>
            </tr>
          </thead>
          <tbody>
            <Week
              num={"23"}
              start={"5th Sept., 2025"}
              end={"12th Sept., 2025"}
              revenue={"500, 000"}
              tickets={"100, 000"}
            />
            <Week
              num={"24"}
              start={"13th Sept., 2025"}
              end={"20th Sept., 2025"}
              revenue={"700, 000"}
              tickets={"120, 000"}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RevenuePage;
