import styles from "../styles/routespage.module.css";

function Route({id, name, start, end, stops, status}){
    return (
        <tr className={styles.route}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{start}</td>
            <td>{end}</td>
            <td>{stops}</td>
            <td>{status}</td>
            <td><button className={styles.suspend}>SUSPEND</button></td>
            <td><button className={styles.del}>DELETE</button></td>
        </tr>
    )
}

export default Route;