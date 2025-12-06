import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import { Download, PlusCircle, XCircle, TicketIcon } from "lucide-react";
import { useFetchStats, usefetchPurchases } from "../../utils/fetch";
import { useEffect, useState, useContext } from "react";
import styles from "../styles/revenuepage.module.css";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Week from "../components/Week"; 
import { toast } from "sonner";
import numeral from "numeral";

function RevenuePage() {
  const [monthFilter, setMonthFilter] = useState("0");
  const [filteredData, setFilteredData] = useState([]);
  const { data, loading, error } = usefetchPurchases();
  const { stats, statLoading, statError } = useFetchStats();
  const { user, userLoad, userError } = useContext(AuthContext);


  function handleMonthChange(e) {
    setMonthFilter(e.target.value);
  }

  function handleExport() {
    if(stats.length > 0) {
      exportToExcel(
        stats,
        "alamana_pms_revenue_by_weeks",
        "ALAMANA REVENUE BY WEEKS"
      );
    } else {
      toast.error("No data available");
    }
  }

  function handleFilter() {
    if (!stats || stats.length === 0) {
      setFilteredData([]);
      return;
    }

    // default: show everything
    let filtered = [...stats];

    if (monthFilter !== "0") {
      const now = new Date();
      let startDate, endDate;

      switch (monthFilter) {
        case "1": // 1 month ago
          startDate = subMonths(now, 1);
          endDate = now;
          break;
        case "2": // 2 months ago
          startDate = subMonths(now, 2);
          endDate = subMonths(now, 1);
          break;
        case "3": // 3 months ago
          startDate = subMonths(now, 3);
          endDate = subMonths(now, 2);
          break;
        case "4": // last year
          const lastYear = subYears(now, 1);
          startDate = startOfYear(lastYear);
          endDate = endOfYear(lastYear);
          break;
        default:
          startDate = null;
          endDate = null;
      }

      if (startDate && endDate) {
        filtered = filtered.filter((rv) => {
          const rvDate = parseISO(rv.start); // assumes your weekly data has a `start` field (ISO)
          return rvDate >= startDate && rvDate <= endDate;
        });
      }
    }

    setFilteredData(filtered);
  }

  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();

  // last month (handle January -> December of previous year)
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;



  function getLastMonthRevenue(stats) {
    return stats
      .filter((w) => {
        const startDate = new Date(w.start);
        return (
          startDate.getMonth() === lastMonth &&
          startDate.getFullYear() === lastMonthYear
        );
      })
      .reduce((sum, w) => sum + w.totalRevenue, 0);
  }

  function getLastMonthProfit(stats) {
    return stats
      .filter((w) => {
        const startDate = new Date(w.start);
        return (
          startDate.getMonth() === lastMonth &&
          startDate.getFullYear() === lastMonthYear
        );
      })
      .reduce((sum, w) => sum + w.totalProfit, 0);
  }

  function getLastMonthPurchases(purchases){
    return purchases.filter((p) => {
      const purchaseDate = new Date(p.created);
      return (
        purchaseDate.getMonth() === lastMonth &&
        purchaseDate.getFullYear() === lastMonthYear
      );
    });
  }


  
  useEffect(() => {
    handleFilter();
  }, [monthFilter, stats]);
  
  if(statLoading || userLoad || loading) return <Loader />;
  if(!user || userError || statError || error) return <Error error={userError ?? statError ?? error} />;

  const lastMonthRevenue = getLastMonthRevenue(stats);
  const lastMonthProfit = getLastMonthProfit(stats);

  const lifetimeRevenue = stats.reduce((sum, w) => sum + w.totalRevenue, 0);
  const lifetimeProfit = stats.reduce((sum, w) => sum + w.totalProfit, 0);


  const lastMonthPurchasesCount = getLastMonthPurchases(data).length;


  return (
    <div className="container">
      <div className="header">
        <h2>Revenue</h2>
      </div>
      <div className={styles.top}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>All Time Generated Revenue</h2>
            <h3>₦{numeral(lifetimeRevenue).format("0,0")}</h3>
          </div>

          <div className={styles.card}>
            <h2>All Time Generated Profit</h2>
            <h3>₦{numeral(lifetimeProfit).format("0,0")}</h3>
          </div>

          <div className={styles.card}>
            <h2>Last Month's Revenue</h2>
            <h3>₦{numeral(lastMonthRevenue).format("0,0")}</h3>
          </div>

          <div className={styles.card}>
            <h2>Last Month's Profit</h2>
            <h3>₦{numeral(lastMonthProfit).format("0,0")}</h3>
          </div>

          <div className={styles.card}>
            <h2>All Time Sales</h2>
            <h3>{numeral(data.length).format("0,0")}</h3>
          </div>

          <div className={styles.card}>
            <h2>Last Month's Sales</h2>
            <h3>{numeral(lastMonthPurchasesCount).format("0,0")}</h3>
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
            </div>
          </div>
          <div className={styles.left}>
            <button onClick={handleExport}>
              Download Revenue Data <Download style={{ marginLeft: "1rem" }} />
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
              <th>TOTAL SALES</th>
              <th>TOTAL REVENUE</th>
              <th>TOTAL PROFIT</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((week) => (
                <Week
                  num={week.num}
                  start={week.start}
                  end={week.end}
                  sales={week.totalPurchases}
                  revenue={week.totalRevenue}
                  profit={week.totalProfit}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "1rem" }}>
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

export default RevenuePage;
