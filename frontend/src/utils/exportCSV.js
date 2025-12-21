import Papa from "papaparse";

export const exportCSV = records => {
  const data = records.map(r => ({
    "S.No": r.serialNo,
    Name: r.name,
    "VC No": r.vcNo,
    Address: r.address,
    Phone: r.phone
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "srinivasa_records.csv";
  link.click();
};
