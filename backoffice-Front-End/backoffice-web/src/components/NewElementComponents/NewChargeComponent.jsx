import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { useForm, useChargesStore } from "../../hooks";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import HeaderComponent from "../HeaderComponent";

const formDTO = {
  name: "",
  percentage: "",
};

function NewChargeComponent() {
  const navigate = useNavigate();

  const { name, percentage, handleInputChange, clearForm, emptyValidation } =
    useForm(formDTO);

  const { startAddingCharge, charges } = useChargesStore();

  function addCharge(event) {
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

    if (name.length < 3) {
      Toastify({
        text: "El Nombre del cargo debe ser mayor a 2 caracteres",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre del cargo menor a 3 caracteres");
    }

    if (percentage < 0) {
      Toastify({
        text: "El porcentaje no puede ser negativo",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Porcentaje negativo");
    }

    const chargeExists = charges?.find(charge => charge.name === name);
    if (chargeExists) {
      Toastify({
        text: "Ya existe un Cargo con el mismo nombre",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre de cargo ya existe");
    }
    const charge = { name, percentage };

    startAddingCharge(charge);
    clearForm();
    Toastify({
      text: "Cargo Creado",
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
            </section>
            {/* Table and Buttons */}


            <section className="d-flex justify-content-center ">
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={(event) => addCharge(event)}
              >
                Aceptar
              </button>
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={() => { navigate("/charge") }}
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

export default NewChargeComponent;
