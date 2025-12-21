import React from "react";
import { exportCSV } from "../utils/exportCSV";
import { downloadRecordsPDF } from "../pdf/downloadPDF";

function ExportButtons({ records }) {
  return (
    <div className="dropdown mb-2 text-end">
      <button
        className="btn btn-outline-dark dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        ⬇ Download
      </button>

      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            onClick={() => exportCSV(records)}
          >
            Download CSV
          </button>
        </li>

        <li>
          <button
            className="dropdown-item"
            onClick={async () => await downloadRecordsPDF()}
          >
            Download PDF (A4 with Images)
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ExportButtons;
