import styles from "../styles/tripshistory.module.css";
import { format } from "date-fns";

function Purchase({id, date, type, quantity, item = null, drug = null, onView}){
    const formatted = format(date, "do MMMM, yyyy");
    const price = item ? item.price : drug.price;
    return (
        <tr className={styles.trip}>
            <td>{id}</td>
            <td>{formatted}</td>
            <td>{type}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td><button onClick={onView}>View</button></td>
        </tr>
    )
}

export default Purchase;