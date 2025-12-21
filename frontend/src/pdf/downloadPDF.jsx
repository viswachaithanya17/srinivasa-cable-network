import React from "react";
import { pdf } from "@react-pdf/renderer";
import RecordsPDF from "../utils/RecordsPDF";
import api from "../services/api";

export const downloadRecordsPDF = async () => {
  try {
    // 1️⃣ Fetch records from backend
    const res = await api.get("/records");

    // 2️⃣ Generate PDF blob
    const blob = await pdf(
      <RecordsPDF records={res.data} />
    ).toBlob();

    // 3️⃣ Trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "srinivasa_records.pdf";
    document.body.appendChild(link);
    link.click();

    // 4️⃣ Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};
