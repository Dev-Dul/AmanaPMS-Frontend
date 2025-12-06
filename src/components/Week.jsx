import styles from "../styles/revenuepage.module.css";
import { format } from "date-fns";

function Week({num, start, end, revenue, profit, sales}){
    const formatted = format(start, "do MMMM, yyyy");
    const endFormatted = format(end, "do MMMM, yyyy");
    return (
        <tr className={styles.week}>
            <td>{num}</td>
            <td>{formatted}</td>
            <td>{endFormatted}</td>
            <td>{sales}</td>
            <td>{revenue}</td>
            <td>{profit}</td>
        </tr>
    )
}

export default Week;