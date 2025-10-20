import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import styles from "../styles/tripshistory.module.css";
import Receipt from "../components/ReceiptEngine";
import Trip from "../components/Trip";
import { Download, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { toast } from "sonner";

function TripHistoryPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [overlay, setOverlay] = useState(false);
    const [monthFilter, setMonthFilter] = useState("0");
    const [statFilter, setStatFilter] = useState("ALL");
    const { user, userLoad } = useContext(AuthContext);
    
    function handleMonthChange(e){
      setMonthFilter(e.target.value);
    }

    function handleStatChange(e){
      setStatFilter(e.target.value);
    }

    function handleOverlay() {
      setOverlay((prev) => !prev);
    }

    function handlePrint(){
      window.print();
    }

    function handleExport() {
      if(data.length > 0) {
        exportToExcel(routes, `${user.fullname}_swiftryde_trips_history`, "SWIFTRYDE USER TRIP HISTORY");
      }else{
        toast.error("No data available");
      }
    }
       
  
      function handleFilter(){
      let filtered = data;
      if(monthFilter !== "0"){
        const now = new Date();
        let startDate, endDate;
  
        if(monthFilter === "4"){
          // Last Year
          const lastYear = subYears(now, 1);
          startDate = startOfYear(lastYear);
          endDate = endOfYear(lastYear);
        }else{
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

      if(statFilter !== "ALL") filtered = filtered.filter((trp) => trp.status === statFilter);
  
      setFilteredData(filtered);
  
    }
  
    useEffect(() => {
      handleFilter();
    }, [monthFilter, data]);


    useEffect(() => {
      if(user && Array.isArray(user.trips)){
        setData(user.trips);
      }
    }, [user]);


    if(userLoad) return <Loader />;
    if(!user) return <Error/>;

    console.log("Filtered Data:", filteredData);

  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={handleOverlay} />
        <Receipt props={"Hello"} />
        <button type="button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="header">
        <h2>Trips History</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.filter}>
          <div className="first">
            <h2>Filter By Month:</h2>
            <select name="filter" id="filter" onChange={handleMonthChange}>
              <option value="0">All Months</option>
              <option value="1">1 Month Ago</option>
              <option value="2">2 Months Ago</option>
              <option value="3">3 Months Ago</option>
              <option value="4">Last Year</option>
            </select>
          </div>
          <div className="second">
            <h2>Filter By Status:</h2>
            <select
              name="filter_two"
              id="filter_two"
              onChange={handleStatChange}>
              <option value="ALL">ALL</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="EXPIRED">EXPIRED</option>
            </select>
          </div>
        </div>
        <div className={styles.left}>
          <button onClick={handleExport}>
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
              <th>RECEIPT</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((trip) => (
                <Trip
                  key={trip.id}
                  id={trip.id}
                  date={trip.created}
                  type={trip.type}
                  route={trip.route}
                  stop={trip.stop}
                  status={trip.status}
                  onView={handleOverlay}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "1rem" }}>
                  No trips found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TripHistoryPage;