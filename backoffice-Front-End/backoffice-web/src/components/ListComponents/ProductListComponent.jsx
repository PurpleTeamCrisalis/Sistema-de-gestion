import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import HeaderComponent from "../HeaderComponent";
import { useProductsStore } from "../../hooks";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from "sweetalert2";
import AddRemoveButtonsComponent from "../AddRemoveButtonsComponent";
import "../../assets/styles/tableStyle.css";
import EmptyList from "../../utils/EmptyList";
import { ToastContainer } from "react-toastify";
import SearchBar from "../Utils/SearchBar";

function ProductListComponent() {
  const navigate = useNavigate();

  const {
    products,
    startLoadingProducts,
    setActiveProduct,
    startDeletingProduct,
    activeProduct,
  } = useProductsStore();

  const [filteredList, setFilteredList] = useState(products);

  useEffect(() => {
    if (products.length === 0) startLoadingProducts();
  }, []);

  function checkActiveProduct(event, product) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveProduct(product);
        } else {
          tRow.classList.remove("table-active");
          setActiveProduct(null);
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }

  function deleteProduct() {
    if (activeProduct) {
      if (activeProduct.enabled === true) {
        Swal.fire({
          title: `¿Seguro que quieres eliminar ${activeProduct.name}?`,
          showCancelButton: true,
          confirmButtonText: "confirmar",
          cancelButtonText: "cancelar",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            startDeletingProduct();
            Swal.fire("Producto Eliminado", "", "success");
          }
        });
      } else {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "No puede eliminar un producto que esté deshabilitado",
        });
      }
    } else {
      Toastify({
        text: "Seleccionar un producto para eliminar",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
    }
  }

  function editProduct(event, product) {
    setActiveProduct(product);
    navigate("/product/editProduct");
  }

  return (
    <div className="bgGrey">
      <ToastContainer />
      <HeaderComponent />
      <div className="container-fluid mainContainer">
        <div className="secondContainer">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="tablePane">
            {/* Button Section */}
            <AddRemoveButtonsComponent
              newHandler={() => navigate("/product/newProduct")}
              removeHandler={deleteProduct}
              name=""
            />
            <SearchBar
              rawList={products}
              setFilteredList={setFilteredList}
              compareTag={"name"}
            />
            {/* Table Section */}
            {filteredList.length === 0 ? (
              <EmptyList name={"Productos"} />
            ) : (
              <section
                className="d-flex justify-content-center rounded-3 custom-shadow tabla-container-color"
                style={{ maxHeight: "65vh", overflowY: "auto" }}
              >
                <table className="table table-color">
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      borderBottom: "2px solid black",
                    }}
                  >
                    <tr style={{ textAlign: "center" }}>
                      <th scope="col" width="5%">
                        #
                      </th>
                      <th scope="col" width="12%">
                        Nombre Producto
                      </th>
                      <th scope="col" width="50%">
                        Descripción
                      </th>
                      <th scope="col" width="10%">
                        Precio Base
                      </th>
                      <th scope="col" width="10%">
                        Estado
                      </th>
                      <th scope="col" width="5%">
                        #
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList?.map((product) => (
                      <tr
                        key={product.id}
                        className=""
                        style={{ textAlign: "center" }}
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
                              checkActiveProduct(event, product)
                            }
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td className="text-overflow">{product.description}</td>
                        <td>{"$" + product.basePrice.toFixed(2)}</td>
                        <td
                          style={{
                            color: product.enabled ? "#198754" : "red",
                          }}
                        >
                          {product.enabled ? "Habilitado" : "Deshabilitado"}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onClick={(event) => editProduct(event, product)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListComponent;
