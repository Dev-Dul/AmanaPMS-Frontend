import logoUrl from "../assets/Img/swiftryde_logo.jpg";
import styles from "../styles/receipt.module.css";
import { AuthContext } from "../../utils/context";
import { useEffect, useRef, useContext } from "react";
import React from "react";
import QRCode from "qrcode";

function Receipt({trip}) {
  const { user } = useContext(AuthContext);
  const qrRef = useRef(null);
  const ticket = trip.ticket;

  // Generate QR code on mount
  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(
        qrRef.current,
        JSON.stringify({ ticket }),
        { width: 100, margin: 1 }
      );
    }
  }, [trip]);

  const eventName = "AFUSTA Bus Transit Ticket";
  const  wittyLine = "The Swift Way To Move 🎟️";
  const tagline = "Powered by SwiftRyde";
  const date = trip?.ticket?.created;
  const plateNum = trip?.trip?.bus?.plateNumber || trip?.bus?.plateNumber; 

  return (
    <div className={`${styles.receiptContainer} printable`}>
      <div className={styles.receipt}>
        {/* Header */}
        <div className={styles.receiptHeader}>
          <h1>{eventName}</h1>
          <p className={styles.date}>{date}</p>
        </div>

        {/* Body */}
        <div className={styles.receiptBody}>
          <p className={styles.label}>Issued To:</p>
          <p className={styles.value}>{trip?.user?.fullname || user.fullname}</p>

          <div className={styles.divider}></div>

          <div className={styles.infoRow}>
            <div>
              <p className={styles.label}>Ticket ID</p>
              <p className={styles.code}>{trip.ticket.id}</p>
            </div>
            <div>
              <p className={styles.label}>Route</p>
              <p className={styles.code}>Sch/BK</p>
            </div>
            <div className={styles.amount}>
              <p className={styles.label}>Amount</p>
              <p className={styles.value}>N{trip?.ticket?.price}</p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <div>
              <p className={styles.label}>Trip Type</p>
              <p className={styles.code}>{trip.type}</p>
            </div>
            <div>
              <p className={styles.label}>Seat No.</p>
              <p className={styles.code}>{trip.seatNumber}</p>
            </div>
            <div>
              <p className={styles.label}>B/Stop</p>
              <p className={styles.code}>AP2</p>
            </div>
            <div>
              <p className={styles.label}>Bus</p>
              <p className={styles.code}>{plateNum}</p>
            </div>
          </div>

          <div className={styles.qrBox}>
            <canvas ref={qrRef}></canvas>
          </div>

          <p className={styles.witty}>{wittyLine}</p>
        </div>

        {/* Footer */}
        <div className={styles.receiptFooter}>
          {logoUrl && <img src={logoUrl} alt="Logo" className={styles.logo} />}
          <p className={styles.tagline}>{tagline}</p>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
