import api from "../services/api";
import { useState } from "react";

function EditModal({ record, close, refresh }) {
  const [form, setForm] = useState(record);

  const update = async () => {
    await api.put(`/records/${record._id}`, form);
    refresh();
    close();
  };

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5>Edit Record</h5>

          <input className="form-control mb-2"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />

          <button className="btn btn-success" onClick={update}>Update</button>
          <button className="btn btn-secondary ms-2" onClick={close}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
