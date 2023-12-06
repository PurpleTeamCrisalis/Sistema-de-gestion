import React from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useClientsStore } from '../../hooks/useClientsStore';
import { useForm } from '../../hooks';
import { formValidations } from '../../utils/FormValidations';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

function EditClientComponent() {
    const navigate = useNavigate();
    const { startUpdatingClient, activeClient, setActiveClient, clients } = useClientsStore();
    const [isEnabled, setIsEnabled] = useState(activeClient?.enabled);

    const { name, lastname, dni, phone, adress, isbussiness, bussinessname, startdate, cuit, enabled, handleInputChange, emptyValidation } = useForm({
        name: activeClient?.name,
        lastname: activeClient?.lastname,
        dni: activeClient?.dni,
        phone: activeClient?.phone,
        adress: activeClient?.adress,
        isbussiness: activeClient?.isbussiness,
        bussinessname: activeClient?.bussinessname,
        startdate: activeClient?.startdate,
        enabled: activeClient?.enabled,
        cuit: activeClient?.cuit,
        id: activeClient?.id,
    });

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
            enabled: isEnabled,
            startdate,
            cuit: parseInt(cuit),
        };

        // Validaciones de los datos Editados
        if (formValidations(clientAux)) {
            return console.log("Campos incorrectos")
        }

        // Verifica si los nuevos datos son ya existentes
        const clienteExiste = clients?.find(client => { return client.dni === dni });
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
                        <section className="container bg-primary rounded-3 mt-5 mb-4 form-section" style={{ minHeight: "70vh", width: "90%" }}>
                            <div className="text-center pt-2">
                                <h3 className="fs-4">Editar Cliente Persona</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row justify-content-center align-items-center">
                                {/* Persona */}

                                <div className="col-sm-12">
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
                                            <label htmlFor="lastname" className="form-label">Apellido</label>
                                            <input
                                                type="text"
                                                name='lastname'
                                                id='lastname'
                                                onChange={handleInputChange}
                                                value={lastname}
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
                                        {/* Estado del cliente */}
                                        <div className="col-12 mb-3">
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

                                </div>

                            </div>
                        </section>


                        {/* Buttons */}
                        <section className="d-flex justify-content-center buttons-section">
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

export default EditClientComponent