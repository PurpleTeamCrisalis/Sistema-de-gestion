import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { useForm, useUsersStore } from "../../hooks";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import HeaderComponent from '../HeaderComponent';

const formDTO = {
  username: "",
  password: "",
  email: ""
};

function NewUserComponent()
{
  const navigate = useNavigate();

  const { username, password, email, handleInputChange, clearForm, emptyValidation } =
    useForm(formDTO);

  const { startAddingUser, users } = useUsersStore();

  function addUser(event)
  {
    event.preventDefault();

    if (!emptyValidation())
    {
      Toastify({
        text: "Hay campos vacíos",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Campos vacíos");
    }

    if (username.length < 5)
    {
      Toastify({
        text: "El Nombre de usuario debe ser mayor a 5 caracteres",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre de usuario menor a 5 caracteres");
    }

    if (password.length < 5)
    {
      Toastify({
        text: "La contraseña debe ser mayor a 5 caracteres",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Contraseña menor a 5 caracteres");
    }

    const usuarioExiste = users?.find(user => user.username === username);
    if (usuarioExiste)
    {
      Toastify({
        text: "Nombre de usuario ya existe",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre de usuario ya existe");
    }
    const user = { username, email ,password };

    startAddingUser(user);
    clearForm();
    Toastify({
      text: "Usuario Creado",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }

  return (
    <div className="bgGrey">
      <HeaderComponent />
      <div className="container-fluid">
        <div className="d-flex">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="">
            <section className="container bg-primary rounded-3 mt-5 mb-3" style={{ minHeight: "70vh", width: "90%" }}>
              <div className="text-center pt-4">
                <h3 className="fs-4 text-light">Añadir Usuario</h3>
                <hr className="bg-light" />
              </div>
              <div className="row justify-content-center align-items-center">
                {/* Persona */}
                <div className="col-12">
                  <div className="row m-4">
                    <div className="mb-3">
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
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={handleInputChange}
                        value={password}
                        placeholder="Ingresar constraseña"
                      />
                    </div>
                    <div className="">
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
                  </div>
                </div>
              </div>
            </section>
            <section className="d-flex justify-content-center ">
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={(event) => addUser(event)}
              >
                Añadir
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
      </div>
    </div>
  );
}

export default NewUserComponent;
