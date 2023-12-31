import React, { useState } from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm, useProductsStore } from '../../hooks';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";
import "../../assets/styles/inputStyle.css"
import TaxModal from '../Modal/TaxModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function EditProductComponent() {
    const navigate = useNavigate();
    const { startUpdatingProduct, activeProduct, setActiveProduct, products } = useProductsStore();
    const { name, description, basePrice, enabled, handleInputChange, emptyValidation, taxes } = useForm({
        name: activeProduct?.name,
        description: activeProduct?.description,
        basePrice: activeProduct?.basePrice,
        enabled: activeProduct?.enabled,
        //taxes: activeProduct.taxes,
        id: activeProduct?.id,
    });

    const [tax, setTax] = useState(activeProduct?.taxes);
    const [isEnabled, setIsEnabled] = useState(activeProduct?.enabled);

    // Edicion de producto
    function editProduct(event) {
        event.preventDefault();

        // Objeto producto
        const productaux = {
            id: activeProduct?.id,
            name,
            description,
            basePrice: parseFloat(basePrice),
            enabled: isEnabled,
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

        // Verifica si los nuevos datos son ya existentes
        const productoExiste = products?.find(product => { return product.name === name });
        if ((productoExiste) && (activeProduct.name !== name)) {
            Toastify({
                text: "El producto ya existe",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: producto ya existe");
        }
        try {
            startUpdatingProduct({ ...productaux, taxes: tax })
            Toastify({
                text: "Producto Actualizado",
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
                        <section className="container bg-primary rounded-3 mt-4 mb-4 form-section" style={{ minHeight: "70vh", width: "95%" }}>
                            <div className="text-center py-4">
                                <h3 className="fs-4 text-light">Editar Producto</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="row m-4">
                                        <div className="col-md-12 mb-3">
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
                                            <label htmlFor="basePrice" className="form-label mt-3">Precio Base</label>
                                            <input
                                                type="text"
                                                name="basePrice"
                                                id="basePrice"
                                                className="form-control"
                                                min={0}
                                                onChange={handleInputChange}
                                                value={basePrice}
                                                required
                                            />
                                            <div className="">
                                                <label htmlFor="enabled" className="form-label mt-2">Estado</label>
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
                                <div className="col-md-6 col-sm-12 ">
                                    <div className='row m-4'>
                                        <label htmlFor="description" className="form-label">Descripción</label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            className="form-control mb-3"
                                            rows="3"
                                            cols="2"
                                            required
                                            minLength={1}
                                            maxLength={200}
                                            onChange={handleInputChange}
                                            value={description}
                                            style={{ resize: "none" }}
                                        >d
                                        </textarea>
                                        <TaxModal tax={tax} setTax={setTax} />

                                    </div>

                                </div>
                            </div>
                        </section>


                        {/* Buttons */}
                        <section className="d-flex justify-content-center ">
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={editProduct}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={() => navigate("/product")}
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

export default EditProductComponent