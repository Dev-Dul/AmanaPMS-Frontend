import { useState, useContext } from "react";
import styles from "../styles/trip.module.css";
import QrCodeScanner from "../components/QRscanner";
import { AuthContext } from "../../utils/context";
import { XCircle } from "lucide-react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { toast } from "sonner";

function ScannerPage() {
  const [overlay, setOverlay] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);
  const { user, userLoad, userError } = useContext(AuthContext);

  if (!user) return <Error />;
  if (userLoad) return <Loader />;
  if (userError) return <Error error={userError} />;

  function handleValidTicket(res) {
    setTicketDetails(res.ticket || res.data || res);
    setOverlay(true);
  }

  function handleInvalidTicket(err) {
    toast.error(err?.message || "Invalid or expired ticket");
  }

  return (
    <div className="container">
      {/* Overlay */}
      <div className={`${styles.overlay} ${overlay ? styles.active : ""}`}>
        <XCircle className={styles.close} onClick={() => setOverlay(false)} />
        {ticketDetails && (
          <form>
            <h2>Ticket Scan Successful!</h2>
            <h3>Ticket Is Valid</h3>
            <div className={styles.deetBox}>
              <h3>Ticket Details:</h3>
              <p>Passenger Name: {ticketDetails.passengerName}</p>
              <p>Passenger Type: {ticketDetails.role}</p>
              <p>Admission No: {ticketDetails.admissionNo}</p>
              <p>Route: {ticketDetails.route}</p>
              <p>Bus Stop: {ticketDetails.stop}</p>
              <p>Purchased for: {ticketDetails.tripTime}</p>
              <p>Purchased at: {ticketDetails.purchaseTime}</p>
            </div>
            <button type="button">Admit</button>
          </form>
        )}
      </div>

      <div className="header">
        <h2>Ticket Verification</h2>
      </div>

      <div className={`${styles.top} ${styles.two}`}>
        <h2>Use the QR Scanner below to verify passenger tickets</h2>
        <p className={styles.sub}>
          Note: Only passengers with valid tickets should be allowed onto the
          bus.
        </p>
      </div>

      <div className={`${styles.middle} ${styles.two}`}>
        <QrCodeScanner
          onSuccess={handleValidTicket}
          onFailure={handleInvalidTicket}
        />
      </div>
    </div>
  );
}

export default ScannerPage;
