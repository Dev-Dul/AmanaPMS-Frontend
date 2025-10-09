import styles from "../styles/trip.module.css";
import QrCodeScanner from "../components/QRscanner";
import { XCircle } from "lucide-react";
import { useState } from "react";

function ScannerPage(){
    const [overlay, setOverlay] = useState(false);

    function handleOverlay() {
      setOverlay((prev) => !prev);
    }


    return (
      <div className="container">
        <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
          <XCircle className={styles.close} onClick={handleOverlay} />
          <form action="">
            <h2>Ticket Scan Was Succesful!</h2>
            <h3>Ticket Is Valid</h3>
            <div className={styles.deetBox}>
              <h3>Ticket Details:</h3>
              <p>Passenger Name: AbdulRahim Jamil</p>
              <p>Passenger Type: Student</p>
              <p>Admission No: 2010203057</p>
              <p>Route: School - Birnin Kebbi</p>
              <p>Bus Stop: School - AP2</p>
              <p>Ticket purchased by AbdulRahim Jamil</p>
              <p>Ticket purchased for 6:30 AM Trip (DEPARTURE)</p>
              <p>Ticket purchased at 4:00 AM, 8th Oct., 2025</p>
            </div>
            <button>Admit</button>
          </form>
        </div>
        <div className="header">
          <h2>Ticket Verification</h2>
        </div>
        <div className={`${styles.top} ${styles.two}`}>
          <h2>Use The QR Scanner Below to Verify Passenger Tickets</h2>
          <p className={styles.sub}>
            Note: Only Passengers with valid tickets should be allowed onto the
            bus.
          </p>
        </div>
        <div className={`${styles.middle} ${styles.two}`}>
          <QrCodeScanner />
        </div>
      </div>
    );
}

export default ScannerPage;