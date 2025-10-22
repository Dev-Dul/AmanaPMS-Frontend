import styles from "../styles/tripshistory.module.css";
import { format } from "date-fns";

function Trip({id, date, type, route, seat, status, onView}){
    const formatted = format(date, "do MMMM, yyyy");
    return (
        <tr className={styles.trip}>
            <td>{id}</td>
            <td>{formatted}</td>
            <td>{type}</td>
            <td>{route}</td>
            <td>{seat}</td>
            <td>{status}</td>
            <td><button onClick={onView}>View</button></td>
        </tr>
    )
}

export default Trip;