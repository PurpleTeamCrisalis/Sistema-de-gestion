import React, { useState } from "react";
import { useNewOrderStore } from "../../hooks";

const productsDto = [
  {
    id: 1,
    basePrice: 200,
    description: "LoremLoremLoremLoremLoremLoremLoremLorem",
    name: "Zapatilla",
    type: "Product",
  },
  {
    id: 2,
    basePrice: 200,
    description: "djasldjashdjasdjhkasjhkdgasjd",
    name: "Medias",
    type: "Product",
  },
  {
    id: 3,
    basePrice: 200,
    description: "LoremLoremLoremLoremLoremLoremLorem",
    name: "Pantalones",
    type: "Product",
  },
];

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

export const ProductServiceModal = () => {
  const { addProducts, addServices } = useNewOrderStore();

  const bienes = [...productsDto, ...servicesDto];

  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  function checkActiveItem(event, bien) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          bien.type === "Product"
            ? setProducts([...products, bien])
            : setServices([...services, bien]);
        } else {
          tRow.classList.remove("table-active");
          bien.type === "Product"
            ? setProducts(
                [...products].filter((product) => product.id !== bien.id)
              )
            : setServices(
                [...services].filter((service) => service.id !== bien.id)
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
    setProducts([]);
    setServices([]);
  }

  function handleButtonClick() {
    addProducts(products);
    addServices(services);
    cleanCheckBoxes();
  }

  return (
    <div
      className="modal fade"
      id="product-service-modal"
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
              Productos y Servicios
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
                  {bienes.map((bien) => (
                    <tr key={bien.id}>
                      <td>
                        <input
                          type="checkbox"
                          id={bien.id}
                          style={{
                            color: "#000000",
                            cursor: "pointer",
                          }}
                          onChange={(event) => checkActiveItem(event, bien)}
                          className="custom-checkbox"
                        />
                      </td>
                      <td>{bien.type}</td>
                      <td>{bien.name}</td>
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
