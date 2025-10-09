import styles from "../styles/receipt.module.css";
import { useEffect, useRef } from "react";
import React from "react";
// import QRCode from "qrcode";

function Receipt({
  eventName = "AFUSTA Bus Transit Ticket",
  userName = "Abdulrahim Jamil",
  ticketId = "TCKT-2025-98765",
  amount = "$25.00",
  date = new Date().toLocaleDateString(),
  wittyLine = "The Swift Way To Move 🎟️",
  logoUrl = "/logo.png",
  tagline = "Powered by SwiftRyde",
}) {
  const qrRef = useRef(null);

  // Generate QR code on mount
  // useEffect(() => {
  //   if (qrRef.current) {
  //     QRCode.toCanvas(
  //       qrRef.current,
  //       JSON.stringify({ ticketId, userName, eventName }),
  //       { width: 100, margin: 1 }
  //     );
  //   }
  // }, [ticketId, userName, eventName]);

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
          <p className={styles.value}>{userName}</p>

          <div className={styles.divider}></div>

          <div className={styles.infoRow}>
            <div>
              <p className={styles.label}>Ticket ID</p>
              <p className={styles.code}>{ticketId}</p>
            </div>
            <div>
              <p className={styles.label}>Route</p>
              <p className={styles.code}>Sch/BK</p>
            </div>
            <div className={styles.amount}>
              <p className={styles.label}>Amount</p>
              <p className={styles.value}>{amount}</p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <div>
              <p className={styles.label}>Trip Type</p>
              <p className={styles.code}>Return</p>
            </div>
            <div>
              <p className={styles.label}>Seat No.</p>
              <p className={styles.code}>30</p>
            </div>
            <div>
              <p className={styles.label}>B/Stop</p>
              <p className={styles.code}>AP2</p>
            </div>
            <div>
              <p className={styles.label}>Bus</p>
              <p className={styles.code}>KSUSTA-BS-001</p>
            </div>
          </div>

          {/* <div className={styles.qrBox}>
            <canvas ref={qrRef}></canvas>
          </div> */}

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
