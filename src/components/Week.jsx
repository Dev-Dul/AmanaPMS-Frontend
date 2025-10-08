import styles from "../styles/revenuepage.module.css";

function Week({num, start, end, revenue, tickets}){
    return (
        <tr className={styles.week}>
            <td>{num}</td>
            <td>{start}</td>
            <td>{end}</td>
            <td>{revenue}</td>
            <td>{tickets}</td>
        </tr>
    )
}

export default Week;