import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import styles from "../styles/transactionpage.module.css";
import Transaction from "../components/Transaction";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import { exportToExcel } from "../../utils/utils";
import { toast } from "sonner";

function TransactionPage(){
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [monthFilter, setMonthFilter] = useState("0");
  const { user, userLoad } = useContext(AuthContext);

   function handleMonthChange(e){
     setMonthFilter(e.target.value);
   }

   function handleExport(){
      if(data.length > 0){
        exportToExcel(data, `${user.fullname}_swiftryde_transaction_history`, "SWIFTRYDE USER TRANSACTION HISTORY");
      }else{
        toast.error("No data available");
      }
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
   
         filtered = filtered.filter((tx) => {
           const txDate = parseISO(tx.created);
           return isAfter(txDate, startDate) && isBefore(txDate, endDate);
         });
       }
   
       setFilteredData(filtered);
   
     }
   
     useEffect(() => {
       handleFilter();
     }, [monthFilter, data]);

    useEffect(() => {
      if(user.tickets) setData(user.tickets);
    }, [user]);


     if(userLoad) return <Loader />;
     if(!user) return <Error />;

    return (
      <div className="container">
        <div className="header">
          <h2>Transaction History</h2>
        </div>
        <div className={styles.top}>
          <div className={styles.filter}>
            <h2>Filter By Month:</h2>
            <select name="filter" id="filter" onChange={handleMonthChange}>
              <option value="0">All Months</option>
              <option value="1">1 Month Ago</option>
              <option value="2">2 Months Ago</option>
              <option value="3">3 Months Ago</option>
              <option value="4">Last Year</option>
            </select>
          </div>
          <div className={styles.left}>
            <button onClick={handleExport}>
              Download History <Download style={{ marginLeft: "1rem" }} />
            </button>
          </div>
        </div>
        <div className={styles.middle}>
          <h3>Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((tx) => (
                  <Transaction
                    key={tx.id}
                    id={tx.id}
                    date={tx.created}
                    amount={tx.price}
                    status={tx.status}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "1rem" }}>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default TransactionPage;