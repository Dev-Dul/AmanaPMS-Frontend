import styles from '../styles/trip.module.css';

function TripPreview({title, status, time }){
	return (
    <div className={styles.preview}>
      <div className={styles.prev}>
        <h2>{title}</h2>
        <h3>Status: {status}</h3>
        <p>Time: {time}</p>
      </div>
    </div>
  );
}

export default TripPreview;