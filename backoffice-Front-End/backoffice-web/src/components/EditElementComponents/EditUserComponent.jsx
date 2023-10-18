import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import NavComponent from '../NavComponent'
import { useForm, useUsersStore } from "../../hooks";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

// const formDTO = {
//   username: "",
// };

function EditUserComponent() {
  const navigate = useNavigate();
  const { startUpdatingUser, activeUser } = useUsersStore();
  const {
    username,
    handleInputChange,
    emptyValidation,
  } = useForm({username:activeUser.username});

  function editUser(event) {
    event.preventDefault();

    if (!emptyValidation()) return console.error("Error: Campos vacíos");

    const user = { username, id:activeUser.id };
    startUpdatingUser(user);
    Toastify({
      text: "Usuario Actualizado",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Table and Buttons */}
                    <div className="col-md-9 col-xl-10">
                    <section
              className="container bg-primary rounded-3 mt-5 mb-3"
              style={{ minHeight: "75vh", width: "90%" }}
            >
              <div className="">
                <h2 className="text-center pt-4 pb-2">Editar Usuario</h2>
                <hr></hr>
              </div>
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "50vh" }}
              >
                <div>
                  
                  <div className="mb-5">
                    <span
                      className="d-inline-block fs-2"
                      style={{ width: "500px" }}
                    >
                      Nuevo Nombre de Usuario
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={handleInputChange}
                      value={username}
                      placeholder="Ingresar nombre de usuario"
                      style={{ width: "350px", height: "50px" }}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="d-flex justify-content-center ">
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={(event) => editUser(event)}
              >
                Aceptar
              </button>
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={() => navigate("/user")}
              >
                Volver
              </button>
            </section>
                    </div>
                </div>
            </div >
        </>
    )
}

export default EditUserComponent;