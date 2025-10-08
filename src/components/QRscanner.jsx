// import { Scanner } from "@yudiel/react-qr-scanner";
// import { toast } from "sonner";

// const customStyles = {
//   container: {
//     width: "400px", // Set the desired width of the entire scanner area
//     height: "300px", // Set the desired height of the entire scanner area
//     margin: "auto", // Example: center the scanner horizontally
//     border: "1px solid #ccc", // Example: add a border to the container
//   },
//   video: {
//     // You can also apply styles directly to the video element if needed
//     // For example, to make it cover the container completely
//     width: "100%",
//     height: "100%",
//     objectFit: "cover", // Ensures the video fills the area without distortion
//   },
// };

// const QrCodeScanner = () => {
//   return (
//     <Scanner
//       onScan={(result) => console.log("Scanned Result:", result[0].rawValue)}
//       onError={(error) => console.error(error)}
//       constraints={{
//         video: true
//       }}
//       styles={customStyles}
//     />
//   );
// };

// export default QrCodeScanner;


import { Scanner } from "@yudiel/react-qr-scanner";

const QrCodeScanner = () => {
  return (
    <div style={{ width: 400, height: 300, margin: "auto" }}>
      <Scanner
        onScan={(result) => {
          if (result?.[0]?.rawValue) {
            console.log("✅ Scanned Result:", result[0].rawValue);
          }
        }}
        onError={(error) => {
          console.error("❌ Scanner error:", error.name, error.message);
        }}
        constraints={{
          video: true
        }}
      />
    </div>
  );
};

export default QrCodeScanner;

