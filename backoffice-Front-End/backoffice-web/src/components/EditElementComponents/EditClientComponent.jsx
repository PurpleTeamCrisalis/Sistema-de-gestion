import React from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useClientsStore } from '../../hooks/useClientsStore';
import { useForm } from '../../hooks';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function EditClientComponent() {
    const navigate = useNavigate();
    const { startUpdatingClient, activeClient, setActiveClient, clients } = useClientsStore();
    const { name, lastName, dni, phone, adress, isBussiness, bussinessName, StartDate, cuit, enabled, handleInputChange, emptyValidation } = useForm({
        name: activeClient?.name,
        lastName: activeClient?.lastName,
        dni: activeClient?.dni,
        phone: activeClient?.phone,
        adress: activeClient?.adress,
        isBussiness: activeClient?.isBussiness,
        bussinessName: activeClient?.bussinessName,
        StartDate: activeClient?.startDate,
        cuit: activeClient?.cuit,
        enabled: activeClient?.enabled,
        id: activeClient?.id,
    });

    // Validaciones de inputs
    function formValidations() {
        function validateField(value, fieldName, minLength, maxLength) {
            let errorMessage;
            if (value.length < minLength || value.length > maxLength) {
                if ((fieldName !== "teléfono")) {
                    errorMessage = `Error: ${fieldName} debe tener entre ${minLength} y ${maxLength} caracteres`;
                } else {
                    errorMessage = `Error: ${fieldName} debe tener ${minLength} caracteres`
                }
                Toastify({
                    text: errorMessage,
                    duration: 2000,
                    style: {
                        background: "linear-gradient(to right, #f44336, #b71c1c)",
                    },
                }).showToast();
                return false;
            }
            return true;
        }
        if (!validateField(name, "Nombre", 5, 50) || !validateField(lastName, "Apellido", 5, 50) ||
            !validateField(dni, "DNI", 7, 9) || !validateField(phone, "teléfono", 10, 10) ||
            !validateField(adress, "dirección", 1, 100)
        ) {
            return true
        } else {
            return false
        }

    }
    // Edicion de cliente
    function editClient(event) {
        event.preventDefault();

        // Objeto cliente
        const clientAux = {
            id: activeClient?.id,
            name,
            lastName,
            dni: parseInt(dni),
            phone: parseInt(phone),
            adress,
            isBussiness,
            bussinessName,
            StartDate: "",
            cuit: parseInt(cuit),
        };

        // Validaciones de los datos Editados
        if (formValidations()) {
            return console.log("Campos incorrectos")
        }

        // Verifica si los nuevos datos son ya existentes
        const clienteExiste = clients?.find(client => client.dni === dni);
        if ((clienteExiste) && (activeClient.dni !== dni)) {
            Toastify({
                text: "El cliente ya existe",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: cliente ya existe");
        }

        try {
            startUpdatingClient(clientAux)
            Toastify({
                text: "Usuario Actualizado",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        } catch (error) {
            return console.error("Error: No se pudo editar " + error);
        }

    }
    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Imputs and Buttons */}
                    <div className="col-md-9 col-xl-10">
                        {/* Inputs */}
                        <section className="container bg-primary rounded-3 mt-5 mb-4" style={{ minHeight: "75vh", width: "90%" }}>
                            <div className="text-center py-4">
                                <h3 className="fs-4">Editar Cliente</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row justify-content-center align-items-center">
                                {/* Persona */}

                                <div className="col-sm-6">
                                    <h2 className='text-center'>Persona</h2>
                                    <div className="row m-4">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                name='name'
                                                id='name'
                                                onChange={handleInputChange}
                                                value={name}
                                                className="form-control"
                                                placeholder={"Ingresa Nombre"}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="lastName" className="form-label">Apellido</label>
                                            <input
                                                type="text"
                                                name='lastName'
                                                id='lastName'
                                                onChange={handleInputChange}
                                                value={lastName}
                                                className="form-control"
                                                placeholder={"Ingresa Apellido"}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="dni" className="form-label">D.N.I</label>
                                            <input
                                                type="text"
                                                name='dni'
                                                id='dni'
                                                onChange={handleInputChange}
                                                value={dni}
                                                className="form-control"
                                                placeholder={"Ingresa DNI"}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="phone" className="form-label">Teléfono</label>
                                            <input
                                                type="text"
                                                name='phone'
                                                id='phone'
                                                onChange={handleInputChange}
                                                value={phone}
                                                className="form-control"
                                                placeholder={"Ingresa Teléfono"}
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="adress" className="form-label">Dirección</label>
                                            <input
                                                type="text"
                                                name='adress'
                                                id='adress'
                                                onChange={handleInputChange}
                                                value={adress}
                                                className="form-control"
                                                placeholder={"Ingresa Direccion"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>


                        {/* Buttons */}
                        <section className="d-flex justify-content-center ">
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={editClient}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={() => navigate("/client")}
                            >
                                Volver
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditClientComponent