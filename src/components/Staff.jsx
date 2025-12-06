import styles from "../styles/operatorpage.module.css";
import { XCircle } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

function Staff({id, name, username, date, sales, status, handleDelete}){
    const formatted = format(date, "do MMMM, yyyy");
    const isActive = status === "ACTIVE";

    return (
        <tr className={styles.operator}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{formatted}</td>
            <td>{sales}</td>
            <td>{status}</td>
            <td><button className={isActive ? styles.suspend : styles.active} onClick={() => handleDelete(1, id)}>{isActive ? "SUSPEND" : "ACTIVATE"}</button></td>
            <td><button className={styles.del} onClick={() => handleDelete(0, id)}>DELETE</button></td>
        </tr>
    )
}

export default Staff;