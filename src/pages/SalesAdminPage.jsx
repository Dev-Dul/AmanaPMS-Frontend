import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears, isToday } from "date-fns";
import { Download, PlusCircle, XCircle } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import styles from "../styles/revenuepage.module.css";
import { usefetchPurchases } from "../../utils/fetch";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import Receipt from "../components/ReceiptEngine";
import Purchase from "../components/Purchase";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { toast } from "sonner";

function SalesAdminPage() {
  const [open, setOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [purchase, setPurchase] = useState(null);
  const [statFilter, setStatFilter] = useState("ALL");
  const [monthFilter, setMonthFilter] = useState("0");
  const [filteredData, setFilteredData] = useState([]);
  const { data, loading, error } = usefetchPurchases();
  const { user, userLoad, userError } = useContext(AuthContext);

  
    function handleMonthChange(e){
      setMonthFilter(e.target.value);
    }

    function handleExport(){
      if(data.length > 0){
        exportToExcel(data, "alamana_pms_sales_history_by_weeks", "ALAMANA SALES STATISTICS BY WEEKS");
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
    }, [monthFilter, statFilter, data]);


  function handleOverlay(purchase) {
    if(purchase) {
      setPurchase(purchase);
      setOverlay((prev) => !prev);
    } else {
      setOverlay((prev) => !prev);
    }
  }

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  function handlePrint(){
    window.print();
  }

  function handleStatChange(e) {
    setStatFilter(e.target.value);
  }
  

  if(loading || userLoad) return <Loader />;
  if(userError || error || !user) return <Error />;

  const now = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(now.getDate() - 7);

  const purchasesLastWeek = data.filter(p => {
    const createdDate = new Date(p.created);
    return createdDate >= lastWeek && createdDate <= now;
  });

  const lastMonth = new Date();
  lastMonth.setDate(now.getDate() - 30);

  const salesMadeLastMonth = data.filter((p) => {
    const created = new Date(p.created);
    return created >= lastMonth && created <= now;
  });

  const salesMadeToday = data.filter((p) => {
    const created = new Date(p.created);
    return isToday(created);
  });


  return (
    <div className="container">
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={() => handleOverlay()} />
        {purchase && <Receipt purchase={purchase} />}
        <button type="button" onClick={handlePrint}>
          Print
        </button>
      </div>

      <div className="header">
        <h2>Sales</h2>
      </div>

      <div className={styles.top}>
        <div className={`${styles.cards} ${styles.two}`}>
          <div className={styles.card}>
            <h2>All Time Sales</h2>
            <h3>{data.length}</h3>
          </div>

          <div className={styles.card}>
            <h2>Sales Made Today</h2>
            <h3>{salesMadeToday.length}</h3>
          </div>

          <div className={styles.card}>
            <h2>Sales Made In Last 30 days</h2>
            <h3>{salesMadeLastMonth.length}</h3>
          </div>

          <div className={styles.card}>
            <h2>Sales Made Last Week</h2>
            <h3>{purchasesLastWeek.length}</h3>
          </div>
          
        </div>
        <div className={styles.action}>
          <div className={styles.filter}>
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
                <h2>Filter By Sale Type:</h2>
                <select
                  name="filter_two"
                  id="filter_two"
                  onChange={handleStatChange}
                >
                  <option value="ALL">ALL</option>
                  <option value="DRUG">DRUGS</option>
                  <option value="OTHER">OTHERS</option>
                  <option value="COSMETIC">COSMETICS</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.left}>
            <button onClick={handleExport}>
              Download Sales Data <Download style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <h3>Sales History</h3>
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
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesAdminPage;
