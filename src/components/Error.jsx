import styles from "../styles/error.module.css";

function Error({ error = ''}){
    return (
      <div className={styles.error}>
        <h2>Oops, An Error Occurred.</h2>
        {error && <p>Error: {error} </p>}
        <p className={styles.sub}>
          Try: Refreshing the page or checking your internet connection.
        </p>
      </div>
    );
}

export default Error;