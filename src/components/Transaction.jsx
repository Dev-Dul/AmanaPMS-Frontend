import styles from "../styles/transactionpage.module.css";
import { format } from "date-fns";

function Transaction({id, date, amount, status}){
    const formatted = format(date, "do MMMM, yyyy");
    return (
        <tr className={styles.transaction}>
            <td>{id}</td>
            <td>{formatted}</td>
            <td>{amount}</td>
            <td>{status}</td>
        </tr>
    )
}

export default Transaction;