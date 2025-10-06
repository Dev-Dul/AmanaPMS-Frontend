import styles from "../styles/transactionpage.module.css";

function Transaction({id, date, type, amount, status}){
    return (
        <tr className={styles.transaction}>
            <td>{id}</td>
            <td>{date}</td>
            <td>{type}</td>
            <td>{amount}</td>
            <td>{status}</td>
        </tr>
    )
}

export default Transaction;