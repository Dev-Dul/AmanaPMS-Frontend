import styles from "../styles/trip.module.css";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const qrcodeRegionId = "html5qr-code-full-region";

const QrCodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState("Waiting for QR scan...");
  const scannerRef = useRef(null);

  // Handles successful scan
  const onScanSuccess = (decodedText) => {
    setScannedData(decodedText);
    toast.success(`✅ Scanned: ${decodedText}`);
  };

  // Handles decoding errors (called often, so no spam logging)
  const onScanError = () => {};

  // Start the scanner
  const startScanner = async () => {
    if(scannerRef.current) return; // Prevent multiple inits

    try{
      const { Html5QrcodeScanner } = await import("html5-qrcode");

      const scanner = new Html5QrcodeScanner(
        qrcodeRegionId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          // Remove facingMode for better compatibility
        },
        false
      );

      scanner.render(onScanSuccess, onScanError);
      scannerRef.current = scanner;
      setIsScanning(true);
    }catch(error){
      console.error("❌ Failed to load or start scanner:", error);
      toast.error("Failed to start scanner. Check console for details.");
    }
  };

  // Stop and clear scanner
  const stopScanner = async () => {
    if(scannerRef.current){
      try{
        await scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
        toast.info("Scanner stopped.");
      }catch(err){
        console.warn("Error stopping scanner:", err);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if(scannerRef.current){
        scannerRef.current.clear().catch(console.warn);
        scannerRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }} className={styles.qrcontainer}>
      <h2 style={{textAlign: "left", marginBottom: "0"}}>QR Code Scanner</h2>

      <div
        id={qrcodeRegionId}
        className={styles.region}>
        {!isScanning && "Scanner not started"}
      </div>

      <div>
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
        <p><strong>Last Scanned Data:</strong></p>
        <div
          style={{
            minHeight: "24px",
            border: "1px solid #eee",
            padding: "10px",
            backgroundColor: "#f9f9f9",
          }}>
          {scannedData}
        </div>
      </div>
    </div>
  );
};

export default QrCodeScanner;
