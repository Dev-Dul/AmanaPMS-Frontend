import styles from "../styles/busespage.module.css";

function Bus({id, make, model, plate, capacity, routes, driver, conductor, status}){
    return (
        <tr className={styles.bus}>
            <td>{id}</td>
            <td>{make}</td>
            <td>{model}</td>
            <td>{plate}</td>
            <td>{capacity}</td>
            <td>{routes}</td>
            <td>{driver}</td>
            <td>{conductor}</td>
            <td>{status}</td>
            <td><button className={styles.suspend}>SUSPEND</button></td>
            <td><button className={styles.del}>DELETE</button></td>
        </tr>
    )
}

export default Bus;