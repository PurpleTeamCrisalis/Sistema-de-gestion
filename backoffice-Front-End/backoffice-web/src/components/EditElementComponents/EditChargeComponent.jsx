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
    id: activeCharge?.id
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

    if (name.length < 2) {
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
    if ((chargeExists) && (activeCharge.name !== name)) {
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
          {/* Imputs and Buttons */}
          <div className="tablePane">
            <section className="container bg-primary rounded-3 mt-5 mb-4" style={{ minHeight: "70vh", width: "90%" }}>
              <div className="text-center pt-4">
                <h3 className="fs-4">Editar Cargo</h3>
                <hr className="bg-light" />
              </div>

              <div className="row justify-content-center align-items-center">
                {/* Cargo */}

                <div className="col-sm-6">
                  <h2 className='text-center'>Cargo</h2>
                  <div className="row m-4">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        onChange={handleInputChange}
                        value={name}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="basePrice" className="form-label">Porcentaje</label>
                      <input
                        type="number"
                        name="percentage"
                        id="percentage"
                        className="form-control"
                        min={0}
                        onChange={handleInputChange}
                        value={percentage}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Estado del cargo */}
              <div className="d-flex align-items-center justify-content-center">
                <h5 className="mb-0 me-3">Estado</h5>
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
                    <label className="mb-0 ms-2 fs-5">Habilitado</label>
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
                    <label className="mb-0 ms-2 fs-5">Deshabilitado</label>
                  </div>
                </div>
              </div>
            </section>
            {/* Table and Buttons */}


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