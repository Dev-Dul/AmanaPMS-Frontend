import styles from "../styles/tripshistory.module.css";

function Trip({id, date, type, route, stop, status, onView}){
    return (
        <tr className={styles.trip}>
            <td>{id}</td>
            <td>{date}</td>
            <td>{type}</td>
            <td>{route}</td>
            <td>{stop}</td>
            <td>{status}</td>
            <td><button onClick={onView}>View</button></td>
        </tr>
    )
}

export default Trip;