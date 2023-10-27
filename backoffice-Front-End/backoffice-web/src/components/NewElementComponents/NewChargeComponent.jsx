import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { useForm, useChargesStore } from "../../hooks";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

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

    if(name.length < 3){
      Toastify({
        text: "El Nombre del cargo debe ser mayor a 2 caracteres",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return console.error("Error: Nombre del cargo menor a 3 caracteres");
    }

    if(percentage < 0){
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
    if(chargeExists){
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
                <h2 className="text-center pt-4 pb-2">Añadir Cargo</h2>
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
                      style={{ width: "350px" }}
                    >

                      Nombre del Cargo
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
                  <div>
                    <span
                      className="d-inline-block fs-2"
                      style={{ width: "350px" }}
                    >
                      Porcentaje
                    </span>
                    <input
                      type="number"
                      name="percentage"
                      id="percentage"
                      onChange={handleInputChange}
                      value={percentage}
                      placeholder="Ingresar porcentaje"
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
                onClick={(event) => addCharge(event)}
              >
                Añadir
              </button>
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={() => navigate("/charge")}
              >
                Volver
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewChargeComponent;
