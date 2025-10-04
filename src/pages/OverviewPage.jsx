import styles from "../styles/overviewpage.module.css";

function OverviewPage(){
    return (
      <div className="container">
        <div className="header">
          <h2>Overview</h2>
        </div>
        <div className={styles.top}>
          <h2>Welcome Back!, Admin.</h2>
          <div className={styles.cardsWrapper}>
            <h3>Here's today's stats</h3>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h2>58</h2>
                <h4>Total Trips</h4>
              </div>
              <div className={styles.card}>
                <h2>150</h2>
                <h4>Passengers</h4>
              </div>
              <div className={styles.card}>
                <h2>2000</h2>
                <h4>Tickets Sold</h4>
              </div>
              <div className={styles.card}>
                <h2>150,000</h2>
                <h4>Total Revenue</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.cardsWrapper}>
            <h3>All time stats</h3>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h2>1000</h2>
                <h4>Total Trips</h4>
              </div>
              <div className={styles.card}>
                <h2>5000</h2>
                <h4>Passengers</h4>
              </div>
              <div className={styles.card}>
                <h2>100,000</h2>
                <h4>Tickets Sold</h4>
              </div>
              <div className={styles.card}>
                <h2>150,000, 000</h2>
                <h4>Total Revenue</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <h2>Trips in the last 7 days</h2>
          <div className={styles.chart}></div>
        </div>
      </div>
    );
}

export default OverviewPage;