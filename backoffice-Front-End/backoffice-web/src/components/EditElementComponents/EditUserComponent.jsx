import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { useForm, useUsersStore } from "../../hooks";
import { useAuthStore } from "../../hooks";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from '../HeaderComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

function EditUserComponent() {
  const navigate = useNavigate();
  const { startUpdatingUser, activeUser, setActiveUser, users } = useUsersStore();
  const { username, email, enabled, handleInputChange, emptyValidation } = useForm({
    username: activeUser?.username,
    email: activeUser?.email,
    enabled: activeUser?.enabled,
  });
  const { user, changeAuthUsername } = useAuthStore()
  const [isEnabled, setIsEnabled] = useState(activeUser?.enabled);

  function editUser(event) {
    event.preventDefault();

    if (!emptyValidation()) {
      Toastify({
        text: "Hay campos vacíos",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Campos vacíos");
    }

    if (username.length < 5) {
      Toastify({
        text: "Nombre de usuario debe ser mayor a 5 caracteres",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre de usuario menor a 5 caracteres");;
    }

    const usuarioExiste = users?.find(user => user.username === username);
    if ((usuarioExiste) && (activeUser.username !== username)) {
      Toastify({
        text: "Nombre de usuario ya existe",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre de usuario ya existe");
    }

    const userAux = {
      username,
      email,
      id: activeUser.id,
      enabled: isEnabled
    };


    if (activeUser.username !== user.username) {
      startUpdatingUser(userAux);
    } else {
      if (enabled !== "false") {
        startUpdatingUser(userAux);
        changeAuthUsername(userAux.username);
      } else {
        Toastify({
          text: "No se puede deshabilitar el usuario con el que está logeado",
          duration: 2000,
          style: {
            background: "linear-gradient(to right, #f44336, #b71c1c)",
          },
        }).showToast();
        return console.error("Error: usuario logeado intentó auto-deshabilitarse");
      }
    }

    Toastify({
      text: "Usuario Actualizado",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();


  }

  return (
    <div className="bgGrey">

      <HeaderComponent />
      <div className="container-fluid mainContainer">
        <div className="secondContainer">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="tablePane">
            <section className="container bg-primary rounded-3 mt-5 mb-3" style={{ minHeight: "70vh", width: "90%" }}>
              <div className="text-center pt-4">
                <h3 className="fs-4 text-light">Editar Usuario</h3>
                <hr className="bg-light" />
              </div>
              <div className="row justify-content-center align-items-center">
                {/* Persona */}
                <div className="col-sm-6">
                  <div className="row m-4">
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">Nombre de usuario</label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        onChange={handleInputChange}
                        value={username}
                        placeholder="Ingresar nombre de usuario"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={handleInputChange}
                        value={email}
                        placeholder="Ingresar email"
                      />
                    </div>
                    <div className="">
                      <label htmlFor="enabled" className="form-label">Estado</label>
                      <div className='d-flex align-items-end'>
                        <input
                          type="checkbox"
                          name="enabled"
                          id="enabled"
                          // className="form-control"
                          onChange={(event) => setIsEnabled(event.target.checked)}
                          value={isEnabled}
                          className='btn-check'
                          defaultChecked={isEnabled}
                        />
                        <label htmlFor="enabled" className="btn checkbox-btn w-100">
                          {`${isEnabled ? "Habilitado   " : "Deshabilitado   "}`}
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            id="specialIsChecked"
                            style={{
                              color: "#0ee14e",
                            }}
                          />
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            id="specialIsNotChecked"
                            style={{
                              color: "#e60f0f",
                            }}
                          />
                        </label>
                      </div>
                    </div>
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
                onClick={() => { setActiveUser(null); navigate("/user") }}
              >
                Volver
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserComponent;