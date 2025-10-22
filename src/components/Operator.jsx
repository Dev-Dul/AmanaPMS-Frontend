import styles from "../styles/operatorpage.module.css";
import { format } from "date-fns";

function Operator({id, name, role, bus, date, status}){
    const formatted = format(date, "do MMMM, yyyy");
    const assignedBus = bus[0].plateNumber;
    return (
        <tr className={styles.operator}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{role}</td>
            <td>{assignedBus}</td>
            <td>{formatted}</td>
            <td>{status}</td>
            <td><button className={styles.suspend}>SUSPEND</button></td>
            <td><button className={styles.del}>DELETE</button></td>
        </tr>
    )
}

export default Operator;