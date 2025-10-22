import styles from '../styles/trip.module.css';
import { BusFront, Clock } from 'lucide-react';
import { format } from 'date-fns';

function TripPreview({title, status, time }){
  const formatted = format(time, "h:mm a");
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
            {formatted}
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