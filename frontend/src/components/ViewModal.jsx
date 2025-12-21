import React from "react";

function ViewModal({ record, close }) {
  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">

          {/* HEADER */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              📄 Record Details
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={close}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row">

              {/* LEFT SIDE – DETAILS */}
              <div className="col-md-7">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">

                    <div className="mb-3">
                      <small className="text-muted">S.No</small>
                      <h6>{record.serialNo}</h6>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">Name</small>
                      <h6>{record.name}</h6>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">VC No</small>
                      <h6>{record.vcNo}</h6>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">Phone</small>
                      <h6>{record.phone}</h6>
                    </div>

                    <div className="mb-3">
                      <small className="text-muted">Address</small>
                      <p className="mb-0">{record.address}</p>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT SIDE – IMAGE */}
              <div className="col-md-5 mt-3 mt-md-0">
                <div className="card border-0 shadow-sm text-center h-100">
                  <div className="card-body d-flex align-items-center justify-content-center">

                    {record.image ? (
                      <img
                        src={
                          record.image.startsWith("data:")
                            ? record.image
                            : `http://localhost:5000/uploads/${record.image}`
                        }
                        alt="Record"
                        className="img-fluid rounded"
                        style={{
                          maxHeight: "250px",
                          objectFit: "contain"
                        }}
                      />
                    ) : (
                      <div className="text-muted">
                        <p>No Image Available</p>
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={close}
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewModal;
