import React, { useState } from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks'
import { faL } from '@fortawesome/free-solid-svg-icons'
import { useClientsStore } from '../../hooks/useClientsStore'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { formValidations } from '../../utils/FormValidations'
import HeaderComponent from "../HeaderComponent";

const formDTO = {
    name: "",
    lastname: "",
    dni: "",
    phone: "",
    adress: "",
    isbussiness: true,
    bussinessname: "",
    startdate: "",
    cuit: ""
}

function NewClientCompanyComponent() {
    const navigate = useNavigate();
    const { startAddingClients, clients } = useClientsStore();
    const { name, lastname, dni, phone, adress, isbussiness, bussinessname, startdate, cuit, handleInputChange, clearForm } = useForm(formDTO);

    function addClient(event) {
        event.preventDefault();

        // Objeto del cliente
        const client = {
            name,
            lastname,
            dni: parseInt(dni),
            phone: parseInt(phone),
            adress,
            isbussiness,
            bussinessname,
            startdate,
            cuit: parseInt(cuit),
        };

        // Alerta campos vacíos
        if (formValidations(client)) {
            return
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
            clearForm();
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
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Imputs and Buttons */}
                    <div className="tablePane">
                        {/* Inputs */}
                        <section className="container bg-primary rounded-3 mt-5 mb-4 form-section" style={{ minHeight: "70vh", width: "90%" }}>
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
                                            <label htmlFor="name" className="form-label">Nombre</label>
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
                                            <label htmlFor="lastname" className="form-label">Apellido</label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                id="lastname"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={lastname}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="dni" className="form-label">D.N.I</label>
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
                                            <label htmlFor="phone" className="form-label">Teléfono</label>
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
                                            <label htmlFor="adress" className="form-label">Dirección</label>
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
                                            <label htmlFor="bussinessname" className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                name="bussinessname"
                                                id="bussinessname"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={bussinessname}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cuit" className="form-label">CUIT</label>
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
                                            <label htmlFor="startdate" className="form-label">Inicio de Actividades</label>
                                            <input
                                                type="date"
                                                name="startdate"
                                                id="startdate"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={startdate}
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
        </div>
    )
}

export default NewClientCompanyComponent