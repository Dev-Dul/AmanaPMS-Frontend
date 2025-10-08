import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import "./Receipt.css";

function Receipt({
  eventName = "Moonlight Festival 2025",
  userName = "Abdulrahim Jamil",
  ticketId = "TCKT-2025-98765",
  amount = "$25.00",
  date = new Date().toLocaleDateString(),
  wittyLine = "Because memories deserve better packaging 🎟️",
  logoUrl = "/logo.png",
  tagline = "Powered by Bloctopia",
}) {
  const qrRef = useRef(null);

  // Generate QR code on mount
  useEffect(() => {
    if (qrRef.current) {
      QRCode.toCanvas(
        qrRef.current,
        JSON.stringify({ ticketId, userName, eventName }),
        { width: 100, margin: 1 }
      );
    }
  }, [ticketId, userName, eventName]);

  return (
    <div className="receipt-container">
      <div className="receipt">
        {/* Header */}
        <div className="receipt-header">
          <h1>{eventName}</h1>
          <p className="date">{date}</p>
        </div>

        {/* Body */}
        <div className="receipt-body">
          <p className="label">Issued To:</p>
          <p className="value">{userName}</p>

          <div className="divider"></div>

          <div className="info-row">
            <div>
              <p className="label">Ticket ID</p>
              <p className="code">{ticketId}</p>
            </div>
            <div className="amount">
              <p className="label">Amount</p>
              <p className="value">{amount}</p>
            </div>
          </div>

          <div className="qr-box">
            <canvas ref={qrRef}></canvas>
          </div>

          <p className="witty">{wittyLine}</p>
        </div>

        {/* Footer */}
        <div className="receipt-footer">
          {logoUrl && <img src={logoUrl} alt="Logo" className="logo" />}
          <p className="tagline">{tagline}</p>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
