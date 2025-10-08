import { parseISO, subMonths, isAfter, isBefore, startOfYear, endOfYear, subYears } from "date-fns";
import styles from "../styles/transactionpage.module.css";
import Transaction from "../components/Transaction";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

function TransactionPage(){
  const [data, setData] = useState([]);
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

    return (
      <div className="container">
        <div className="header">
          <h2>Transaction History</h2>
        </div>
        <div className={styles.top}>
          <div className={styles.filter}>
            <h2>Filter By Month:</h2>
            <select name="filter" id="filter" onChange={handleMonthChange}>
                <option value="1">1 Month Ago</option>
                <option value="2">2 Months Ago</option>
                <option value="3">3 Months Ago</option>
                <option value="4">Last Year</option>
            </select>
          </div>
          <div className={styles.left}>
            <button>Download History <Download style={{marginLeft: "1rem"}} /></button>
          </div>
        </div>
        <div className={styles.middle}>
            <h3>Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TYPE</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    <Transaction id={"tr-12409677777bgtrt"} date={"Oct, 6th 2025"} type={"Ticket"} amount={"700"} status={"SUCCESFUL"}  />
                </tbody>
            </table>
        </div>
      </div>
    );
}

export default TransactionPage;