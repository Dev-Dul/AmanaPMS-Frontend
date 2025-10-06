import styles from "../styles/usersoverview.module.css";

function UserOverview({id, name, role, dept, status}){
    return (
        <tr className={styles.user}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{role}</td>
            <td>{dept}</td>
            <td>{status}</td>
            <td><button className={styles.suspend}>SUSPEND</button></td>
            <td><button className={styles.del}>DELETE</button></td>
        </tr>
    )
}

export default UserOverview;