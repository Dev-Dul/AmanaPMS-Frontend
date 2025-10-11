import styles from '../styles/trip.module.css';
import { BusFront, Clock } from 'lucide-react';

function TripPreview({title, status, time }){
	return (
    <div className={styles.preview}>
      <div className={styles.first}>
        <BusFront />
      </div>
      <div className={styles.mid}>
        <h2>{title}</h2>
        <div className={styles.clock}>
          <p>
            {" "}
            <Clock size={15} style={{ margin: "2px 5px"}} />
            {time}
          </p>
        </div>
      </div>
      <div className={styles.last}>
        <h3>{status}</h3>
      </div>
    </div>
  );
}

export default TripPreview;