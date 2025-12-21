import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = records => {
  const doc = new jsPDF();

  doc.text("Srinivasa Cable Network", 14, 10);

  autoTable(doc, {
    startY: 20,
    head: [["S.No", "Name", "VC No", "Address", "Phone"]],
    body: records.map(r => [
      r.serialNo,
      r.name,
      r.vcNo,
      r.address,
      r.phone
    ])
  });

  doc.save("srinivasa_records.pdf");
};
