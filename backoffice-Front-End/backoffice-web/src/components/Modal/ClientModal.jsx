import React, { useEffect, useState } from "react";
import { useClientsStore, useNewOrderStore } from "../../hooks";
import SearchBar from "../Utils/SearchBar";

export const ClientModal = () => {
  const { addClient } = useNewOrderStore();
  const { clients, startLoadingClient } = useClientsStore();
  const [selectedClient, setSelectedClient] = useState(null);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (clients.length === 0) startLoadingClient();
  }, []);

  function checkActiveClient(event, client) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setSelectedClient(client);
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
    setSelectedClient(null);
  }

  function handleButtonClick() {
    if (selectedClient == null) return;
    addClient(selectedClient);
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
              onClick={cleanCheckBoxes}
            ></button>
          </div>
          <div className="modal-body modal-dialog-scrollable">
            <div className="bg-white rounded-3 overflow-hidden">
              <SearchBar
                rawList={clients}
                setFilteredList={setFilteredList}
                compareTag={"isbussiness"}
              />
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
                  {filteredList?.map(
                    (client) =>
                      client.enabled && (
                        <tr
                          key={client.id}
                          className={
                            selectedClient
                              ? selectedClient.id === client.id
                                ? "table-active"
                                : ""
                              : ""
                          }
                        >
                          <td>
                            <input
                              type="checkbox"
                              id={client.id}
                              style={{
                                color: "#000000",
                                cursor: "pointer",
                              }}
                              onChange={(event) =>
                                checkActiveClient(event, client)
                              }
                              className="custom-checkbox"
                              checked={
                                selectedClient
                                  ? selectedClient.id === client.id
                                    ? true
                                    : false
                                  : ""
                              }
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
                      )
                  )}
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
