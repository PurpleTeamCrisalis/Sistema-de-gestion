import React, { useEffect, useState } from "react";
import { useNewOrderStore, useProductsStore } from "../../hooks";
import SearchBar from "../Utils/SearchBar";

export const ProductModal = () => {
  const { addProducts } = useNewOrderStore();
  const { products, startLoadingProducts } = useProductsStore();
  const [productsSelected, setProductsSelected] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [checkItems, setCheckItems] = useState({});

  useEffect(() => {
    setTimeout(() => {
      if (products.length === 0) startLoadingProducts();
    }, 1000);
  }, []);

  function checkActiveItem(event, bien) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setProductsSelected([...productsSelected, bien]);
          setCheckItems({ ...checkItems, [bien.id]: true });
        } else {
          tRow.classList.remove("table-active");
          setProductsSelected(
            [...productsSelected].filter((product) => product.id !== bien.id)
          );
          setCheckItems({ ...checkItems, [bien.id]: false });
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
    setProductsSelected([]);
    setCheckItems({});
  }

  function handleButtonClick() {
    addProducts(productsSelected);
    cleanCheckBoxes();
  }

  return (
    <div
      className="modal fade"
      id="product-modal"
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
              Productos
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
              <SearchBar
                rawList={products}
                setFilteredList={setFilteredList}
                compareTag={"name"}
              />
              <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                <table className="table table-hover">
                  {/* Header de la table */}
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      borderBottom: "2px solid black",
                    }}
                  >
                    <tr style={{ textAlign: "center" }}>
                      <th scope="col" style={{ width: "10%" }}>#</th>
                      <th scope="col" style={{ width: "30%" }}>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList?.map(
                      (product) =>
                        product.enabled && (
                          <tr
                            key={product.id}
                            style={{ textAlign: "center" }}
                            className={
                              checkItems[product.id] ? "table-active" : ""
                            }
                          >
                            <td>
                              <input
                                type="checkbox"
                                id={product.id}
                                style={{
                                  color: "#000000",
                                  cursor: "pointer",
                                }}
                                onChange={(event) =>
                                  checkActiveItem(event, product)
                                }
                                className="custom-checkbox"
                                defaultChecked={checkItems[product.id]}
                              />
                            </td>
                            <td>{product.name}</td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>

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
