import styles from "../styles/revenuepage.module.css";
import { format } from "date-fns";

function Week({num, start, end, revenue, tickets, trips, passengers, type}){
    if(type === "REV"){
        const formatted = format(start, "do MMMM, yyyy");
        const endFormatted = format(end, "do MMMM, yyyy");
        return (
            <tr className={styles.week}>
                <td>{num}</td>
                <td>{formatted}</td>
                <td>{endFormatted}</td>
                <td>{revenue}</td>
                <td>{tickets}</td>
            </tr>
        )
    }else{
        const formatted = format(start, "do MMMM, yyyy");
        const endFormatted = format(end, "do MMMM, yyyy");
        return (
            <tr className={styles.week}>
                <td>{num}</td>
                <td>{formatted}</td>
                <td>{endFormatted}</td>
                <td>{trips}</td>
                <td>{passengers}</td>
            </tr>
        )
    }
}

export default Week;