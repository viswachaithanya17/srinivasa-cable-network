import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import ViewModal from "./ViewModal";

function RecordTable({ records, onEdit, onDelete }) {
  const [view, setView] = useState(null);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>VC No</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Image</th>
              <th style={{ minWidth: "120px" }} className="text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {records.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No records found
                </td>
              </tr>
            )}

            {records.map(r => (
              <tr key={r._id}>
                <td>{r.serialNo}</td>
                <td>{r.name}</td>
                <td>{r.vcNo}</td>
                <td>{r.address}</td>
                <td>{r.phone}</td>

                <td>
                  {r.image ? (
                    <img
                      src={
                        r.image.startsWith("data:")
                          ? r.image
                          : `http://localhost:5000/uploads/${r.image}`
                      }
                      width="50"
                      height="50"
                      style={{
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                      }}
                    />
                  ) : (
                    <span className="text-muted">No Image</span>
                  )}
                </td>

                {/* ICON ACTIONS */}
                <td className="text-center">
                  <FaEye
                    title="View"
                    className="text-info me-3 cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => setView(r)}
                  />

                  <FaEdit
                    title="Edit"
                    className="text-warning me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => onEdit(r)}
                  />

                  <FaTrash
                    title="Delete"
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDelete(r._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {view && <ViewModal record={view} close={() => setView(null)} />}
    </>
  );
}

export default RecordTable;
