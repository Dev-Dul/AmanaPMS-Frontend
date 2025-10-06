import styles from "../styles/tripshistory.module.css";

function Trip({id, date, type, route, stop, status}){
    return (
        <tr className={styles.trip}>
            <td>{id}</td>
            <td>{date}</td>
            <td>{type}</td>
            <td>{route}</td>
            <td>{stop}</td>
            <td>{status}</td>
        </tr>
    )
}

export default Trip;