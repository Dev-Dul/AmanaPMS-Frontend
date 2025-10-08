import styles from "../styles/revenuepage.module.css";

function Ticket({route, stop, price, lastUpdate}){
    return (
        <tr className={styles.ticket}>
            <td>{route}</td>
            <td>{stop}</td>
            <td>{price}</td>
            <td>{lastUpdate}</td>
        </tr>
    )
}

export default Ticket;