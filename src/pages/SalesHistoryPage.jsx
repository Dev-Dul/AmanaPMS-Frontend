import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/tripshistory.module.css";
import Receipt from "../components/ReceiptEngine";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { Download, XCircle } from "lucide-react";
import Purchase from "../components/Purchase";
import { toast } from "sonner";

function SalesHistoryPage() {
    const [data, setData] = useState([]);
    const [purchase, setPurchase] = useState(null);
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

    function handleOverlay(purchase){
      if(purchase){
        setPurchase(purchase);
        setOverlay((prev) => !prev);
      }else{
        setOverlay((prev) => !prev);
      }
    }

    function handlePrint(){
      window.print();
    }

    function handleExport() {
      if(data.length > 0) {
        exportToExcel(routes, `${user.fullname}_swiftryde_sales_history`, "SWIFTRYDE USER SALES HISTORY");
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

      if(statFilter !== "ALL") filtered = filtered.filter((purchase) => purchase.type === statFilter);
  
      setFilteredData(filtered);
  
    }
  
    useEffect(() => {
      handleFilter();
    }, [monthFilter, data]);


    useEffect(() => {
      if(user && Array.isArray(user.purchases)){
        setData(user.purchases);
      }
    }, [user]);


    if(userLoad) return <Loader />;
    if(!user) return <Error/>;


  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={() => handleOverlay()} />
        {trip && <Receipt trip={trip} />}
        <button type="button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="header">
        <h2>Sales History</h2>
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
            <h2>Filter By Product:</h2>
            <select
              name="filter_two"
              id="filter_two"
              onChange={handleStatChange}>
              <option value="ALL">ALL</option>
              <option value="DRUG">DRUGS</option>
              <option value="OTHER">OTHERS</option>
              <option value="COSMETIC">COSMETICS</option>
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
        <h3>Sales</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TYPE</th>
              <th>QTT</th>
              <th>AMOUNT</th>
              <th>RECEIPT</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((purchase) => (
                <Purchase
                  key={purchase.id}
                  id={purchase.id}
                  date={purchase.created}
                  type={purchase.type}
                  quantity={purchase.quantity}
                  item={purchase.item ?? null}
                  drug={purchase.drug ?? null}
                  onView={() => handleOverlay(purchase)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "1rem" }}>
                  No sales by this user found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesHistoryPage;