import styles from "../styles/trip.module.css";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { verifyTicket } from "../../utils/fetch";

const qrcodeRegionId = "html5qr-code-full-region";

/**
 * Props:
 * - onSuccess(result): called when ticket is valid
 * - onFailure(error): called when ticket is invalid or verification fails
 * - autoStart (optional): whether to start scanning automatically
 */
const QrCodeScanner = ({ onSuccess, onFailure, autoStart = false }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState("Waiting for QR scan...");
  const scannerRef = useRef(null);
  const lockRef = useRef(false); // prevents multiple verifications
  const lastScanRef = useRef(null); // avoids duplicate scans of same code

  const onScanSuccess = async (decodedText) => {
    const ticketId = decodedText.trim();

    // prevent multiple scans or same data
    if (lockRef.current || lastScanRef.current === ticketId) return;

    lockRef.current = true;
    lastScanRef.current = ticketId;
    setScannedData(ticketId);

    // Stop scanner before verification
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch (err) {
        console.warn("Failed to clear scanner:", err);
      }
      setIsScanning(false);
    }

    toast.loading("Verifying ticket...");

    try {
      const res = await verifyTicket(ticketId); // send to backend
      toast.dismiss();

      // ✅ If backend returns a valid ticket
      if (res && (res.status === "VALID" || res.ok)) {
        toast.success("Ticket is valid ✅");
        if (onSuccess) onSuccess(res);
      } else {
        // ❌ Ticket invalid or expired
        const message = res?.message || "Ticket invalid or expired";
        toast.error(message);
        if (onFailure) onFailure(res);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Verification failed. Please try again.");
      console.error("verifyTicket error:", error);
      if (onFailure) onFailure(error);
    } finally {
      // unlock after small delay to prevent duplicate scans
      setTimeout(() => {
        lockRef.current = false;
        lastScanRef.current = null;
      }, 1000);
    }
  };

  const onScanError = () => {}; // optional — avoid spam logs

  const startScanner = async () => {
    if (scannerRef.current) return;

    try {
      const { Html5QrcodeScanner } = await import("html5-qrcode");
      const scanner = new Html5QrcodeScanner(
        qrcodeRegionId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      scanner.render(onScanSuccess, onScanError);
      scannerRef.current = scanner;
      setIsScanning(true);
      toast.success("Scanner started");
    } catch (error) {
      console.error("❌ Failed to start scanner:", error);
      toast.error("Failed to start scanner.");
    }
  };

  const stopScanner = async () => {
    if (!scannerRef.current) return;
    try {
      await scannerRef.current.clear();
      scannerRef.current = null;
      setIsScanning(false);
      toast.info("Scanner stopped.");
    } catch (err) {
      console.warn("Error stopping scanner:", err);
    }
  };

  useEffect(() => {
    if (autoStart) startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.warn);
        scannerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.qrcontainer} style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ textAlign: "left", marginBottom: 0 }}>QR Code Scanner</h2>

      <div id={qrcodeRegionId} className={styles.region}>
        {!isScanning && "Scanner not started"}
      </div>

      <div style={{ marginTop: "10px" }}>
        {!isScanning ? (
          <button
            onClick={startScanner}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}>
            Start Scanning
          </button>
        ) : (
          <button
            onClick={stopScanner}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              background: "#dc3545",
              color: "#fff",
              cursor: "pointer",
            }}>
            Stop Scanning
          </button>
        )}
      </div>

      <div style={{ marginTop: "10px" }}>
        <p><strong>Last Scanned Ticket ID:</strong></p>
        <div
          style={{
            minHeight: "24px",
            border: "1px solid #eee",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            overflowWrap: "anywhere",
          }}>
          {scannedData}
        </div>
      </div>
    </div>
  );
};

export default QrCodeScanner;
