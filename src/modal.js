import React from "react";

const ConfirmDeleteModal = ({ showModal, confirmDelete, cancelDelete }) => {
  if (!showModal) return null; // Don't render anything if showModal is false

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelDelete}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={confirmDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
