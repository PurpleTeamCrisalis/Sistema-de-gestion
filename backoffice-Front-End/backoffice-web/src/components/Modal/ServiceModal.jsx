import React, { useEffect, useState } from "react";
import { useNewOrderStore, useServicesStore } from "../../hooks";

export const ServiceModal = () => {
  const { addServices } = useNewOrderStore();
  const { services, startLoadingServices } = useServicesStore();
  const [servicesSelected, setServicesSelected] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (services.length === 0) startLoadingServices();
    }, 2000);
  }, []);

  function checkActiveItem(event, bien) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setServicesSelected([...servicesSelected, bien]);
        } else {
          tRow.classList.remove("table-active");
          setServicesSelected(
            [...servicesSelected].filter((service) => service.id !== bien.id)
          );
        }
      }
    }
  }

  function cleanCheckBoxes() {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    for (const item of checkboxes) {
      item.closest("tr").classList.remove("table-active");
      item.checked = false;
    }
    setServicesSelected([]);
  }

  function handleButtonClick() {
    addServices(servicesSelected);
    cleanCheckBoxes();
  }

  return (
    <div
      className="modal fade"
      id="service-modal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Servicios
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => cleanCheckBoxes()}
            ></button>
          </div>
          <div className="modal-body modal-dialog-scrollable">
            <div className="bg-white rounded-3 overflow-hidden">
              <table className="table table-hover">
                {/* Header de la table */}
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    borderBottom: "2px solid black",
                  }}
                >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td>
                        <input
                          type="checkbox"
                          id={service.id}
                          style={{
                            color: "#000000",
                            cursor: "pointer",
                          }}
                          onChange={(event) => checkActiveItem(event, service)}
                          className="custom-checkbox"
                        />
                      </td>
                      <td>{service.name}</td>
                      <td>{service.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleButtonClick}
              data-bs-dismiss="modal"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
