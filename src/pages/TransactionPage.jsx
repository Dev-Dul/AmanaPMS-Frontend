import styles from "../styles/transactionpage.module.css";
import Transaction from "../components/Transaction";
import { Download } from "lucide-react";

function TransactionPage(){

    return (
      <div className="container">
        <div className="header">
          <h2>Transaction History</h2>
        </div>
        <div className={styles.top}>
          <div className={styles.filter}>
            <h2>Filter By Month:</h2>
            <select name="filter" id="filter">
                <option value="1">1 Month Ago</option>
                <option value="2">2 Months Ago</option>
                <option value="3">3 Months Ago</option>
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