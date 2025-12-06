import styles from "../styles/routespage.module.css";
import { deleteItem } from "../../utils/fetch";
import { format } from "date-fns";

function Item({ item, handleUpdate, handleDelete }){
    const formatted = format(item.registered, "do MMMM, yyyy");
    return (
        <tr className={styles.route}>
            <td>{item.name}</td>
            <td>{item.cost}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.type}</td>
            <td>{item.isAvailable ? "AVAILABLE" : "FINISHED"}</td>
            <td>{formatted}</td>
            <td><button className={styles.suspend} onClick={() => handleUpdate(item)}>UPDATE</button></td>
            <td><button className={styles.del} onClick={() => handleDelete(item.id)}>DELETE</button></td>
        </tr>
    )
}

export default Item;