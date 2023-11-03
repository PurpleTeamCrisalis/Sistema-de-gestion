import React from "react";

export const SelectModal = () => {
  return (
    <div
      className="modal fade"
      id="select-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              Selecciona un bien
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body modal-dialog-scrollable">
            <div className="bg-white rounded-3 overflow-hidden">
              <div className="container d-flex justify-content-evenly">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#product-modal"
                >
                  Productos
                </button>
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#service-modal"
                >
                  Servicios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
