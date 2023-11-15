import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { useForm, useChargesStore } from "../../hooks";
import { useAuthStore } from "../../hooks";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";

// const formDTO = {
//   username: "",
// };

function EditChargeComponent() {
  const navigate = useNavigate();
  const { startUpdatingCharge, activeCharge, setActiveCharge, charges } = useChargesStore();
  const { name, percentage, enabled, id, handleInputChange, emptyValidation } = useForm({
    name: activeCharge?.name,
    percentage: activeCharge?.percentage,
    enabled: activeCharge?.enabled,
    id : activeCharge?.id
  });
  // const { user, changeAuthUsername } = useAuthStore()

  function editCharge(event) {
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

    if(name.length < 2){
      Toastify({
        text: "Nombre del cargo debe ser mayor a 1 caracter",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre del cargo menor a 2 caracteres");;
    }

    const chargeExists = charges?.find(charge => charge.name === name);
    if((chargeExists) && (activeCharge.name !== name)){
      Toastify({
        text: "Nombre de cargo ya existe",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre de cargo ya existe");
    }

    const chargeAux = {
      name,
      id,
      enabled,
      percentage
    };
    console.log(chargeAux)
    startUpdatingCharge(chargeAux);
    
    // } else {
    //   if (enabled !== "false") {
    //     startUpdatingCharge(chargeAux);
    //     // changeAuthUsername(chargeAux.username);
    //   } else {
    //     Toastify({
    //       text: "No se puede deshabilitar el usuario con el que está logeado",
    //       duration: 2000,
    //       style: {
    //         background: "linear-gradient(to right, #f44336, #b71c1c)",
    //       },
    //     }).showToast();
    //     return console.error("Error: usuario logeado intentó auto-deshabilitarse");
    //   }
    // }

    Toastify({
      text: "Cargo Actualizado",
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
            <section
              className="container bg-primary rounded-3 mt-5 mb-3"
              style={{ minHeight: "70vh", width: "90%" }}
            >
              <div className="">
                <h2 className="text-center pt-4 pb-2">Editar Cargo</h2>
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
                    Nuevo Nombre de Cargo
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    value={name}
                    placeholder="Ingresar nombre del cargo"
                    style={{ width: "350px", height: "50px" }}
                  />
                </div>
                <div className="d-flex">
                  <span
                    className="d-inline-block fs-2"
                    style={{ width: "500px" }}
                  >
                    Porcentaje de Recargo
                  </span>
                  <input
                    type="number"
                    name="percentage"
                    id="percentage"
                    onChange={handleInputChange}
                    value={percentage}
                    placeholder="Ingresar el porcentaje"
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
                        defaultChecked={activeCharge.enabled === true}
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
                        defaultChecked={activeCharge.enabled === false}
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
                onClick={(event) => editCharge(event)}
              >
                Aceptar
              </button>
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={() => { setActiveCharge(null); navigate("/charge") }}
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

export default EditChargeComponent;