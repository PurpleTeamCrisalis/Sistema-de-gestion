import React, { useState } from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks'
import { faL } from '@fortawesome/free-solid-svg-icons'
import { useClientsStore } from '../../hooks/useClientsStore'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const formDTO = {
    name: "",
    lastName: "",
    dni: "", // Integer
    phone: "", //Long
    adress: "",
    isBussiness: true,
    bussinessName: "",
    StartDate: "",
    cuit: "" //Long
}

function NewClientCompanyComponent() {
    const navigate = useNavigate();
    const { startAddingClients, clients } = useClientsStore();
    const { name, lastName, dni, phone, adress, isBussiness, bussinessName, StartDate, cuit, handleInputChange, clearForm, emptyValidation } = useForm(formDTO);

    function addClient(event) {
        event.preventDefault();

        // if (!emptyValidation()) {
        //     Toastify({
        //         text: "Hay campos vacíos",
        //         duration: 2000,
        //         style: {
        //             background: "linear-gradient(to right, #f44336, #b71c1c)",
        //         },
        //     }).showToast();
        //     return console.error("Error: Campos vacíos");
        // }

        const clienteExiste = clients?.find(cliente => cliente.dni === dni && cliente.bussinessName === bussinessName);
        if (clienteExiste) {
            Toastify({
                text: "Ya existe la empresa",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: ya existe la empresa");
        }

        const client = {
            name,
            lastName,
            dni: parseInt(dni),
            phone: parseFloat(phone), // Convierte a número de punto flotante
            adress,
            isBussiness,
            bussinessName,
            StartDate,
            cuit: parseFloat(cuit), // Convierte a número de punto flotante
        };

        startAddingClients(client);
        clearForm();
        Toastify({
            text: "Usuario Creado",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }

    function formValidations() {
        function validateField(value, fieldName, minLength, maxLength) {
            let errorMessage;
            if (value.length < minLength || value.length > maxLength) {
                if ((fieldName != "teléfono") || (fieldName != "Nombre de Empresa")) {
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
        if (StartDate === "") {
            Toastify({
                text: "Ingrese una fecha",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return true
        }
        if (!validateField(name, "Nombre", 5, 50) || !validateField(lastName, "Apellido", 5, 50) ||
            !validateField(dni, "DNI", 7, 9) || !validateField(phone, "teléfono", 10, 10) ||
            !validateField(adress, "dirección", 0, 100) || !validateField(bussinessName, "Nombre de Empresa", 0, 100)
            || !validateField(cuit, "CUIT", 10, 11)
        ) {
            return true
        } else {
            return false
        }

    }

    function emptyForm() {
        return (
            name.length === 0,
            lastName.length === 0,
            dni.length === 0,
            phone.length === 0,
            adress.length === 0,
            bussinessName.length === 0,
            cuit.length === 0
        )
    }

    function addClient(event) {
        event.preventDefault();

        // Alerta campos vacíos
        if (emptyForm()) {
            Toastify({
                text: "Hay campos vacíos",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: Campos vacíos");
        }

        // Objeto del cliente
        const client = {
            name,
            lastName,
            dni: parseInt(dni),
            phone: parseInt(phone), // Convierte a número entero (Long)
            adress,
            isBussiness,
            bussinessName,
            StartDate,
            cuit: parseInt(cuit), // Convierte a número entero (Long)
        };

        // Validaciones de los datos ingresados
        if (formValidations()) {
            return console.log("Campos incorrectos")
        }

        // Comprueba existencia de Cliente
        const clienteExiste = clients?.find(clientList => { return clientList.cuit === client.cuit });
        if (clienteExiste) {
            Toastify({
                text: "La empresa ya existe",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: La empresa ya existe");
        }

        try {
            startAddingClients(client);
            // clearForm();
            Toastify({
                text: "Cliente Creado",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: "ERROR",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("ERROR EXTERNO");
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
                                <h3 className="fs-4">Añadir Cliente Empresa</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row">
                                {/* Responsable */}
                                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                                    <h2>Responsable</h2>
                                    <div className="row m-4">
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">Nombre</h5>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={name}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">Apellido</h5>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={lastName}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">D.N.I</h5>
                                            <input
                                                type="text"
                                                name="dni"
                                                id="dni"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={dni}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h5 className="form-h5">Teléfono</h5>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={phone}
                                            />
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <h5 className="form-h5">Dirección</h5>
                                            <input
                                                type="text"
                                                name="adress"
                                                id="adress"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={adress}
                                            />
                                        </div>
                                    </div>

                                </div>
                                {/* Empresa */}
                                <div className="col-md-6 col-sm-12 d-flex flex-column align-items-center">
                                    <h2>Empresa</h2>
                                    <div className="row m-4">
                                        <div className="mb-3">
                                            <h5 className="form-h5">Nombre</h5>
                                            <input
                                                type="text"
                                                name="bussinessName"
                                                id="bussinessName"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={bussinessName}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <h5 className="form-h5">CUIT</h5>
                                            <input
                                                type="text"
                                                name="cuit"
                                                id="cuit"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={cuit}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <h5 className="form-h5">Inicio de Actividades</h5>
                                            <input
                                                type="date"
                                                name="StartDate"
                                                id="StartDate"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={StartDate}
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
                                onClick={addClient}
                            >
                                Añadir
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

export default NewClientCompanyComponent