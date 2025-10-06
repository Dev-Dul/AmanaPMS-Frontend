import styles from "../styles/operatorpage.module.css";

function Operator({id, name, role, bus, date, status}){
    return (
        <tr className={styles.operator}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{role}</td>
            <td>{bus}</td>
            <td>{date}</td>
            <td>{status}</td>
            <td><button className={styles.suspend}>SUSPEND</button></td>
            <td><button className={styles.del}>DELETE</button></td>
        </tr>
    )
}

export default Operator;