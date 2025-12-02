import styles from "../styles/operatorpage.module.css";
import { format } from "date-fns";

function Staff({id, name, username, date, sales, status}){
    const formatted = format(date, "do MMMM, yyyy");
    return (
        <tr className={styles.operator}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{formatted}</td>
            <td>{sales}</td>
            <td>{status}</td>
            <td><button className={styles.suspend}>SUSPEND</button></td>
            <td><button className={styles.del}>DELETE</button></td>
        </tr>
    )
}

export default Staff;