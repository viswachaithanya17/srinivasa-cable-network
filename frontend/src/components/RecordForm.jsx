import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../services/api";

function RecordForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state;

  const [form, setForm] = useState({
    serialNo: "",
    name: "",
    vcNo: "",
    address: "",
    phone: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ AUTO-FILL FORM ON EDIT
  useEffect(() => {
    if (editData) {
      setForm({
        serialNo: editData.serialNo,
        name: editData.name,
        vcNo: editData.vcNo,
        address: editData.address,
        phone: editData.phone
      });
    }
  }, [editData]);

  // ✅ SUBMIT HANDLER WITH SWEETALERTS
  const submit = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(form).forEach(k => data.append(k, form[k]));
      if (image) data.append("image", image);

      if (editData) {
        // UPDATE
        await api.put(`/records/${editData._id}`, data);

        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Record updated successfully",
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        // ADD
        await api.post("/records", data);

        await Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Record added successfully",
          timer: 2000,
          showConfirmButton: false
        });
      }

      navigate("/"); // back to table
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ CANCEL CONFIRMATION
  const cancelForm = async () => {
    const result = await Swal.fire({
      title: "Discard changes?",
      text: "Your entered data will be lost",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, discard",
      cancelButtonText: "No, stay"
    });

    if (result.isConfirmed) {
      navigate("/");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h5 className="mb-3">
        {editData ? "Update Record" : "Add Record"}
      </h5>

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="S.No"
          value={form.serialNo}
          onChange={e => setForm({ ...form, serialNo: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="VC No"
          value={form.vcNo}
          onChange={e => setForm({ ...form, vcNo: e.target.value })}
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Phone (10 digits)"
          value={form.phone}
          maxLength="10"
          onChange={e =>
            setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
          }
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          onChange={e => setImage(e.target.files[0])}
        />

        <button
          className="btn btn-success"
          type="submit"
          disabled={loading}
        >
          {loading
            ? editData
              ? "Updating..."
              : "Adding..."
            : editData
            ? "Update Record"
            : "Add Record"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={cancelForm}
          disabled={loading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default RecordForm;
