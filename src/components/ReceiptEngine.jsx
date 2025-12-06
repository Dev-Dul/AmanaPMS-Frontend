import logoUrl from "../assets/Img/amanaLogo.png";
import styles from "../styles/receipt.module.css";
import { AuthContext } from "../../utils/context";
import { useEffect, useRef, useContext } from "react";
import React from "react";
import QRCode from "qrcode";

function Receipt({purchase}) {
  

  const eventName = "ALAMANA PMS Purchase Receipt";
  const  wittyLine = "Trusted Care, Every Step!";
  const tagline = "Powered by Transcendent Systems (An original creation by Abdulrahim Jamil)";
  const date = purchase.created;
  const issuer = purchase.seller.fullname; 
  const price = purchase?.drug?.price || purchase?.item?.price;

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
          <p className={styles.value}>Customer</p>

          <div className={styles.divider}></div>

          <div className={styles.infoRow}>
            <div>
              <p className={styles.label}>Purchase ID</p>
              <p className={styles.code}>{purchase.id}</p>
            </div>
            <div>
              <p className={styles.label}>Purchase Type</p>
              <p className={styles.code}>{purchase.type}</p>
            </div>
            <div className={styles.amount}>
              <p className={styles.label}>Product Name</p>
              <p className={styles.value}>
                {purchase?.drug?.name || purchase?.item?.name}
              </p>
            </div>
          </div>

          <div className={styles.infoRow}>
            <div className={styles.amount}>
              <p className={styles.label}>Amount</p>
              <p className={styles.value}>
                ₦{price}
              </p>
            </div>

            <div>
              <p className={styles.label}>Quantity</p>
              <p className={styles.code}>{purchase.quantity}</p>
            </div>

            <div>
              <p className={styles.label}>Issued By:</p>
              <p className={styles.code}>{issuer}</p>
            </div>

            <div className={styles.divider}></div>

            <div>
              <p className={styles.label}>Total:</p>
              <p className={styles.code}>{purchase.quantity * price}</p>
            </div>

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
