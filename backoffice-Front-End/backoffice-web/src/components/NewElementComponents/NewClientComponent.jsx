import React from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks'
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
    isbussiness: false,
    bussinessname: "",
    startdate: "", 
    cuit: "", 
}

function NewClientComponent() {
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
            cuit: parseInt(0), 
        };

        if (formValidations(client)) {
            return console.log("Campos erroneos o vacios")
        }

        // Comprueba existencia de Cliente
        const clienteExiste = clients?.find(clientList => { return clientList.dni === client.dni });
        if (clienteExiste) {
            Toastify({
                text: "El cliente ya existe",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: El cliente ya existe");
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
                        <section className="container bg-primary rounded-3 mt-5 mb-4" style={{ minHeight: "70vh", width: "90%" }}>
                            <div className="text-center py-4">
                                <h3 className="fs-4 text-light">Añadir Cliente</h3>
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
                                        <div className="col-12 mb-3">
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

export default NewClientComponent