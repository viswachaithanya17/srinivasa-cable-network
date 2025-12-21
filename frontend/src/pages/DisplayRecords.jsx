import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";
import RecordTable from "../components/RecordTable";
import ExportButtons from "../components/ExportButtons";

function DisplayRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch Records with error handling
  const fetchRecords = async () => {
    try {
      const res = await api.get("/records");
      setRecords(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load records. Please try again later."
      });
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // ✅ Search filter
  const filtered = records.filter(r =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.serialNo?.toString().includes(search)
  );

  // ✅ SweetAlert Delete Flow
  const deleteRecord = async id => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it"
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/records/${id}`);
      fetchRecords();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Record deleted successfully",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to delete record. Please try again."
      });
    }
  };

  // ✅ Edit navigation
  const editRecord = record => {
    navigate("/add", { state: record });
  };

  return (
    <>
      {/* SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search by S.No or Name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* DOWNLOAD */}
      <ExportButtons records={filtered} />

      {/* TABLE */}
      <RecordTable
        records={filtered}
        onEdit={editRecord}
        onDelete={deleteRecord}
      />
    </>
  );
}

export default DisplayRecords;
