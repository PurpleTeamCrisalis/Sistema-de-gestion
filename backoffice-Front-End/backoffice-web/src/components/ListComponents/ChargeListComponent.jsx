import React, { useEffect, useState } from "react";
import NavComponent from "../NavComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useChargesStore } from "../../hooks";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from "sweetalert2";
import HeaderComponent from "../HeaderComponent";
import "../../assets/styles/navStyle.css";
import AddRemoveButtonsComponent from "../AddRemoveButtonsComponent";
import EmptyList from "../../utils/EmptyList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChargeListComponent() {
  const navigate = useNavigate();

  const {
    charges,
    startLoadingCharges,
    setActiveCharge,
    startDeletingCharge,
    activeCharge,
  } = useChargesStore();

  useEffect(() => {
    if (charges.length === 0) startLoadingCharges();
  }, []);

  function checkActiveCharge(event, charge) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveCharge(charge);
        } else {
          tRow.classList.remove("table-active");
          setActiveCharge(null);
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }

  function deleteCharge() {
    if (activeCharge) {
      if (activeCharge.enabled === true) {
        Swal.fire({
          title: `¿Seguro que quieres eliminar ${activeCharge.name}?`,
          showCancelButton: true,
          confirmButtonText: "confirmar",
          cancelButtonText: "cancelar",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            startDeletingCharge();
            Swal.fire("Cargo Eliminado", "", "success");
          }
        });
      } else {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "No puede eliminar un cargo que esté deshabilitado",
        });
      }
    } else {
      Toastify({
        text: "Seleccionar un cargo para eliminar",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
    }
  }

  function editCharge(event, charge) {
    setActiveCharge(charge);
    navigate("/charge/editCharge");
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
            {/* Button Section
            <section className="d-flex justify-content-center m-3">
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={() => navigate("/charge/newCharge")}
              >
                Nuevo
              </button>
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={deleteCharge}
              >
                Eliminar
              </button>
            </section> */}
            <AddRemoveButtonsComponent
              newHandler={() => navigate("/charge/newCharge")}
              removeHandler={deleteCharge}
              name=""
            />

            {/* Table Section */}
            {charges.length === 0 ? (
              <EmptyList name={"Impuestos"} />
            ) : (
              <section
                className="d-flex justify-content-center rounded-3 custom-shadow tabla-container-color"
                style={{ maxHeight: "85vh", overflowY: "auto" }}
              >
                <table className="table table-color">
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
                      <th scope="col">Nombre Cargo</th>
                      <th scope="col">Porcentaje</th>
                      <th scope="col">Estado</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charges?.map((charge) => (
                      <tr key={charge.id} className="">
                        <td>
                          <input
                            type="checkbox"
                            id={charge.id}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onChange={(event) =>
                              checkActiveCharge(event, charge)
                            }
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{charge.name}</td>
                        <td>{charge.percentage}%</td>
                        <td
                          style={{
                            color: charge.enabled ? "green" : "red",
                          }}
                        >
                          {charge.enabled ? "Habilitado" : "Deshabilitado"}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onClick={(event) => editCharge(event, charge)}
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

export default ChargeListComponent;
