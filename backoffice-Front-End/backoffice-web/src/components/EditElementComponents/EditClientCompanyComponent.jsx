import React from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useClientsStore } from '../../hooks/useClientsStore';
import { useForm } from '../../hooks';
import { formValidations } from '../../utils/FormValidations'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

function EditClientCompanyComponent() {

    const navigate = useNavigate();
    const { startUpdatingClient, activeClient, setActiveClient, clients } = useClientsStore();
    const { name, lastname, dni, phone, adress, isbussiness, bussinessname, startdate, cuit, enabled, handleInputChange, emptyValidation } = useForm({
        name: activeClient?.name,
        lastname: activeClient?.lastname,
        dni: activeClient?.dni,
        phone: activeClient?.phone,
        adress: activeClient?.adress,
        isbussiness: activeClient?.isbussiness,
        bussinessname: activeClient?.bussinessname,
        startdate: activeClient?.startdate.split("T")[0],
        enabled: activeClient?.enabled,
        cuit: activeClient?.cuit,
        id: activeClient?.id,
    });
    const [isEnabled, setIsEnabled] = useState(activeClient?.enabled);

    // Edicion de cliente
    function editClient(event) {
        event.preventDefault();

        // Objeto cliente
        const clientAux = {
            id: activeClient?.id,
            name,
            lastname,
            dni: parseInt(dni),
            phone: parseInt(phone),
            adress,
            isbussiness,
            bussinessname,
            startdate,
            enabled: isEnabled,
            cuit: parseInt(cuit),
        };

        // Validaciones de los datos Editados
        if (formValidations(clientAux)) {
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

        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Imputs and Buttons */}
                    <div className="tablePane">
                        {/* Inputs */}
                        <section className="container bg-primary rounded-3 mt-5 mb-3 form-section" style={{ minHeight: "70vh", width: "90%" }}>
                            <div className="text-center pt-2">
                                <h3 className="fs-4">Editar Cliente Empresa</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row justify-content-center">
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
                                        <div className="col-md-12">
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
                                        <div className="">
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
                                <div className="col-10 mb-3">
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
        </div>
    )
}

export default EditClientCompanyComponent