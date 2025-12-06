import styles from "../styles/routespage.module.css";
import { deleteDrug } from "../../utils/fetch";
import { format } from "date-fns";

function Drug({ drug, handleUpdate, handleDelete }){
    const formatted = format(drug.registered, "do MMMM, yyyy");
    return (
        <tr className={styles.route}>
            <td>{drug.name}</td>
            <td>{drug.cost}</td>
            <td>{drug.price}</td>
            <td>{drug.quantity}</td>
            <td>{drug.isAvailable ? "AVAILABLE" : "FINISHED"}</td>
            <td>{formatted}</td>
            <td><button className={styles.suspend} onClick={() => handleUpdate(drug)}>UPDATE</button></td>
            <td><button className={styles.del} onClick={() => handleDelete(drug.id)}>DELETE</button></td>
        </tr>
    )
}

export default Drug;