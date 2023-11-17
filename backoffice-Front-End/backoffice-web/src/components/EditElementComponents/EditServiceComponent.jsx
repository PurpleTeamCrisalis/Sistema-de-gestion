import React, { useState } from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm, useServicesStore } from '../../hooks';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";
import "../../assets/styles/inputStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import TaxModal from '../Modal/TaxModal';


function EditServiceComponent() {
    const navigate = useNavigate();
    const { startUpdatingService, activeService, setActiveService, services } = useServicesStore();
    const { name, description, basePrice, enabled, suportCharge, handleInputChange, emptyValidation, taxes } = useForm({
        name: activeService?.name,
        description: activeService?.description,
        basePrice: activeService?.basePrice,
        enabled: activeService?.enabled,
        id: activeService?.id,
        //taxes: activeService?.taxes,
        suportCharge: activeService?.suportCharge
    });
    const [isSpecial, setIsSpecial] = useState(activeService?.isSpecial);
    const [tax, setTax] = useState(activeService?.taxes);
    const [isEnabled, setIsEnabled] = useState(activeService?.enabled);

    // Edicion de servicio
    function editService(event) {
        event.preventDefault();

        // Objeto servicio
        const serviceaux = {
            id: activeService?.id,
            name,
            description,
            basePrice: parseFloat(basePrice),
            enabled,
            isSpecial,
            suportCharge
        };

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

        if (name.length < 1 || name.length > 50) {
            Toastify({
                text: "El nombre debe tener entre 1 y 50 caracteres",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: Nombre menor a 1 o mayor a 50 caracteres");
        }

        if (description.length < 1 || description.length > 200) {
            Toastify({
                text: "La descripción debe tener entre 1 a 200 caracteres",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: descripción menor a 1 o mayor a 200 caracteres");
        }

        if (basePrice < 0) {
            Toastify({
                text: "El precio no puede ser negativo",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: precio negativo");
        }
        if (isSpecial && suportCharge <= 0) {
            Toastify({
                text: "El precio de soporte debe ser mayor a cero",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: precio de soporte invalido");
        }

        // Verifica si los nuevos datos son ya existentes
        const servicioExiste = services?.find(service => { return service.name === name });
        if ((servicioExiste) && (activeService.name !== name)) {
            Toastify({
                text: "El servicio ya existe",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: servicio ya existe");
        }
        try {
            //Si no es especial se manda un cero, para evitar que viaje un número cuando no debería
            startUpdatingService({
                ...serviceaux,
                suportCharge: isSpecial ? suportCharge : 0,
                taxes: tax
            })
            Toastify({
                text: "Servicio Actualizado",
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
                        <section className="container bg-primary rounded-3 mt-5 mb-4" style={{ minHeight: "70vh", width: "90%" }}>
                            <div className="text-center pt-4">
                                <h3 className="fs-4">Editar Servicio</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row justify-content-center align-items-center">
                                <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center">
                                    <div className="row mx-4">
                                        <div className="col-sm-12">
                                            <div className="row justify-content-md-center">
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
                                                    <label htmlFor="basePrice" className="form-label">Precio Base</label>
                                                    <input
                                                        type="number"
                                                        name="basePrice"
                                                        id="basePrice"
                                                        className="form-control"
                                                        min={0}
                                                        onChange={handleInputChange}
                                                        value={basePrice}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <label htmlFor="isSpecial" className="form-label">Servicio Especial</label>
                                                    <div className='d-flex align-items-end'>
                                                        <input
                                                            type="checkbox"
                                                            name="isSpecial"
                                                            id="isSpecial"
                                                            // className="form-control"
                                                            onChange={(event) => setIsSpecial(event.target.checked)}
                                                            value={isSpecial}
                                                            className='btn-check'
                                                            defaultChecked={isSpecial}
                                                        />
                                                        <label htmlFor="isSpecial" className="btn checkbox-btn w-100">
                                                            {`${isSpecial ? "Habilitado   " : "Deshabilitado   "}`}
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
                                                <div className="col-md-6 mb-3">
                                                    {isSpecial &&
                                                        <div className="">
                                                            <label htmlFor="suportCharge" className="form-label">Precio Soporte</label>
                                                            <input
                                                                type="number"
                                                                name="suportCharge"
                                                                id="suportCharge"
                                                                className="form-control"
                                                                min={0}
                                                                onChange={handleInputChange}
                                                                value={suportCharge}
                                                            />
                                                        </div>}
                                                    {!isSpecial &&
                                                        <div className="">
                                                            <label htmlFor="suportCharge" className="form-label">Precio Soporte</label>
                                                            <input
                                                                type="number"
                                                                name="suportCharge"
                                                                id="suportCharge"
                                                                className="form-control"
                                                                disabled
                                                                style={{ background: "#fff3" }}
                                                            />
                                                        </div>}
                                                </div>
                                                <div className="col-md-6 col-sm-12">
                                                    <p htmlFor="enabled" className="form-label text-center">Estado</p>
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
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="row mx-4">
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label mb-4">Descripción</label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                className="form-control"
                                                rows="3"
                                                cols="2"
                                                required
                                                minLength={1}
                                                maxLength={200}
                                                onChange={handleInputChange}
                                                value={description}
                                                style={{ resize: "none" }}
                                            >
                                            </textarea>
                                            
                                        </div>
                                        <div className="">
                                                <TaxModal tax={tax} setTax={setTax} />
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
                                onClick={editService}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={() => navigate("/service")}
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

export default EditServiceComponent