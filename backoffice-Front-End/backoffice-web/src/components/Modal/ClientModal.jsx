import React, { useEffect, useState } from "react";
import { useClientsStore, useNewOrderStore } from "../../hooks";

export const ClientModal = () => {
  const { addClient } = useNewOrderStore();
  const { clients, startLoadingClient } = useClientsStore();
  const [client, setClient] = useState(null);

  useEffect(() => {
    startLoadingClient();
  }, []);

  function checkActiveClient(event, client) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setClient(client);
        } else {
          tRow.classList.remove("table-active");
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }

  function cleanCheckBoxes() {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    for (const item of checkboxes) {
      item.closest("tr").classList.remove("table-active");
      item.checked = false;
    }
    setClient(null);
  }

  function handleButtonClick() {
    if(client == null)
      return;
    addClient(client);
    cleanCheckBoxes();
  }

  return (
    <div
      className="modal fade"
      id="client-modal"
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
              Clientes
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
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td>
                        <input
                          type="checkbox"
                          id={client.id}
                          style={{
                            color: "#000000",
                            cursor: "pointer",
                          }}
                          onChange={(event) => checkActiveClient(event, client)}
                          className="custom-checkbox"
                        />
                      </td>
                      <td>
                        {client.isbussiness ? "Empresa" : "Persona Fisica"}
                      </td>
                      <td>
                        {client.isbussiness
                          ? client.bussinessname
                          : `${client.name} ${client.lastname}`}
                      </td>
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
