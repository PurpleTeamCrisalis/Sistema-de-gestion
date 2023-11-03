import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { useForm, useUsersStore } from "../../hooks";
import { useAuthStore } from "../../hooks";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from '../HeaderComponent';
// const formDTO = {
//   username: "",
// };

function EditUserComponent() {
  const navigate = useNavigate();
  const { startUpdatingUser, activeUser, setActiveUser, users } = useUsersStore();
  const { username,email, enabled, handleInputChange, emptyValidation } = useForm({
    username: activeUser?.username,
    email: activeUser?.email,
    enabled: activeUser?.enabled,
  });
  const { user, changeAuthUsername } = useAuthStore()

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

    if(username.length < 5){
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
    if((usuarioExiste) && (activeUser.username !== username)){
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
      enabled
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
    
    <HeaderComponent/>
      <div className="container-fluid mainContainer">
        <div className="secondContainer">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="tablePane">
            <section
              className="container bg-primary rounded-3 mt-5 mb-3"
              style={{ minHeight: "70vh", width: "90%" }}
            >
              <div className="">
                <h2 className="text-center pt-4 pb-2">Editar Usuario</h2>
                <hr></hr>
              </div>
              <div
                className="d-flex flex-column align-items-center justify-content-center gap-5"
                style={{ minHeight: "50vh" }}
              >
                <div className="d-flex">
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
                <div className="d-flex">
                  <span
                    className="d-inline-block fs-2"
                    style={{ width: "500px" }}
                  >
                    E-Mail
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    value={email}
                    placeholder="Ingresar email"
                    style={{ width: "350px", height: "50px" }}
                  />
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span
                    className="d-inline-block fs-2"
                    style={{ width: "400px" }}
                  >
                    Estado
                  </span>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="enabled"
                        id="enabled"
                        onChange={handleInputChange}
                        value="true"
                        defaultChecked={activeUser.enabled === true}
                      />
                      <label className="ms-4 fs-5">Habilitado</label>
                    </div>
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        name="enabled"
                        id="enabled"
                        onChange={handleInputChange}
                        value="false"
                        defaultChecked={activeUser.enabled === false}
                      />
                      <label className="ms-4 fs-5">Deshabilitado</label>
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