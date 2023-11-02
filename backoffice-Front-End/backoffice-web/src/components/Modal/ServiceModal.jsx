import React, { useState } from "react";
import { useNewOrderStore } from "../../hooks";

const servicesDto = [
  {
    id: 4,
    basePrice: 200,
    description: "LoremLoremLoremLoremLoremLoremLoremLoremLorem",
    name: "Limpieza",
    type: "Service",
  },
  {
    id: 5,
    basePrice: 200,
    description: "LoremLoremLoremLoremLoremLoremLoremLoremLorem",
    name: "Reparación",
    type: "Service",
  },
];

export const ServiceModal = () =>
{
  const { addServices } = useNewOrderStore();

  const [services, setServices] = useState([]);

  const servicesFromAPI = [...servicesDto];

  function checkActiveItem(event, service)
  {
    let checkboxes = document.getElementsByClassName("service-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes)
    {
      if (item.id == checkbox.id)
      {
        if (checkbox.checked)
        {
          tRow.classList.add("table-active");
          setServices([...services, service])
        } else
        {
          tRow.classList.remove("table-active");
          setServices(
            [...services].filter((p) => p.id !== service.id)
          )
        }
      }
    }
  }

  function cleanCheckBoxes()
  {
    let checkboxes = document.getElementsByClassName("product-checkbox");
    for (const item of checkboxes)
    {
      item.closest("tr").classList.remove("table-active");
      item.checked = false;
    }
    setServices([]);
  }

  function handleButtonClick()
  {
    addServices(services);
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
                    <th scope="col">Tipo</th>
                    <th scope="col">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {servicesFromAPI.map((service) => (
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
                          className="service-checkbox"
                        />
                      </td>
                      <td>{service.type}</td>
                      <td>{service.name}</td>
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
