import styles from "../styles/revenuepage.module.css";

function Week({num, start, end, revenue, tickets, trips, passengers, type}){
    if(type === "REV"){
        return (
            <tr className={styles.week}>
                <td>{num}</td>
                <td>{start}</td>
                <td>{end}</td>
                <td>{revenue}</td>
                <td>{tickets}</td>
            </tr>
        )
    }else{
        return (
            <tr className={styles.week}>
                <td>{num}</td>
                <td>{start}</td>
                <td>{end}</td>
                <td>{trips}</td>
                <td>{passengers}</td>
            </tr>
        )
    }
}

export default Week;