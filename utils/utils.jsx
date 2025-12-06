import { useRef, createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const apiUrl = import.meta.env.VITE_API_URL;


// Create the context
// ScrollContext.js

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Reset after 150ms of no scroll
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <ScrollContext.Provider value={{ isScrolling }}>
      {children}
    </ScrollContext.Provider>
  );
};




export function ThemeEngine(theme){
    const body = document.body;
    switch (theme){
        case 'light': 
            body.style.setProperty('--bg-color', '#f7f7f7');
            body.style.setProperty('--text-color', '#040404');
            body.style.setProperty('--shadow-color', '#04040480');
        break;
        case 'dark': 
            body.style.setProperty('--bg-color', '#0d0d0eff');
            body.style.setProperty('--text-color', '#dee2e8ff');
            body.style.setProperty('--shadow-color', '#ffffff80');
        break;
        case 'orchid': 
            body.style.setProperty('--bg-color', '#2c0c3c');
            body.style.setProperty('--text-color', '#f0e6f7');
            body.style.setProperty('--shadow-color', '#ffffff80');
        break;
        case 'rose': 
            body.style.setProperty('--bg-color', '#f7d3d8ff');
            body.style.setProperty('--text-color', '#2b0209ff');
            body.style.setProperty('--shadow-color', '#2b020990');
        break;
        case 'emerald': 
            body.style.setProperty('--bg-color', '#003d29');
            body.style.setProperty('--text-color', '#e0ffe0');
            body.style.setProperty('--shadow-color', '#e0ffe080');
        break;   
    }
}

const socket = io(apiUrl, {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;

export function imageLinkGenerator(seed, admin = null){
  const encodedName = encodeURIComponent(seed);
  let imageUrl;
  if(admin){
    imageUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodedName}&backgroundColor=fffff7&textColor=007ba7`;
  }else{
    imageUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${encodedName}&backgroundColor=007ba7&textColor=fffff7`;
  }

  return imageUrl;
}

/**
 * Exports an array of objects to an Excel file, with optional heading/title.
 * @param {Array<Object>} data - The JSON array to export
 * @param {string} fileName - The desired file name (e.g. "data.xlsx")
 * @param {string} sheetName - Optional name for the Excel sheet
 * @param {string} heading - Optional heading/title text for the sheet
 */

export async function exportToExcel(data, fileName = "data.xlsx", sheetName = "Sheet1", heading = ""){
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("No data to export or invalid format.");
    return;
  }

  // Create worksheet from data
  const worksheet = XLSX.utils.json_to_sheet(data, {
    origin: heading ? "A2" : "A1",
  });

  // Add heading (optional)
  if (heading) {
    XLSX.utils.sheet_add_aoa(worksheet, [[heading]], { origin: "A1" });

    // Merge heading row across all columns
    const colCount = Object.keys(data[0]).length;
    worksheet["!merges"] = worksheet["!merges"] || [];
    worksheet["!merges"].push({
      s: { r: 0, c: 0 },
      e: { r: 0, c: colCount - 1 },
    });
  }

  // Auto adjust column widths
  const colWidths = Object.keys(data[0]).map((key) => ({
    wch: Math.max(
      key.length,
      ...data.map((row) => String(row[key] ?? "").length)
    ),
  }));
  worksheet["!cols"] = colWidths;

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Convert to binary data
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Try to use the native file picker
  if ("showSaveFilePicker" in window) {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [
          {
            description: "Excel Files",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            },
          },
        ],
      });

      const writable = await fileHandle.createWritable();

      // ✅ FIXED: Must convert blob to ArrayBuffer before writing
      const buffer = await blob.arrayBuffer();
      await writable.write(buffer);
      await writable.close();

      console.log("✅ Excel file successfully saved!");
      return;
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("❌ File save cancelled by user.");
      } else {
        console.error("❌ Error saving file:", err);
      }
    }
  }

  // Fallback for browsers without file picker support
  saveAs(blob, fileName);
}



