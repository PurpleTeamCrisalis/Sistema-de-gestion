import React, { useState } from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm, useProductsStore } from '../../hooks';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";
import "../../assets/styles/inputStyle.css"
import TaxModal from '../Modal/TaxModal';

function EditProductComponent() {
    const navigate = useNavigate();
    const { startUpdatingProduct, activeProduct, setActiveProduct, products } = useProductsStore();
    const { name, description, basePrice, enabled, handleInputChange, emptyValidation, taxes} = useForm({
        name: activeProduct?.name,
        description: activeProduct?.description,
        basePrice: activeProduct?.basePrice,
        enabled: activeProduct?.enabled,
        taxes: activeProduct.taxes,
        id: activeProduct?.id,
    });

    const [tax, setTax] = useState(taxes);

    // Edicion de producto
    function editProduct(event) {
        event.preventDefault();

        // Objeto producto
        const productaux = {
            id: activeProduct?.id,
            name,
            description,
            basePrice: parseFloat(basePrice),
            enabled,
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
            startUpdatingProduct({...productaux, taxes: tax})
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
                        <section className="container bg-primary rounded-3 mt-5 mb-4" style={{ minHeight: "70vh", width: "90%" }}>
                            <div className="text-center pt-4">
                                <h3 className="fs-4">Editar Producto</h3>
                                <hr className="bg-light" />
                            </div>

                            <div className="row justify-content-center align-items-center">
                                {/* Persona */}

                                <div className="col-sm-6">
                                    <h2 className='text-center'>Producto</h2>
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
                                        <div className="">
                                            <label htmlFor="description" className="form-label">Descripción</label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                className="form-control"
                                                rows="4"
                                                cols="2"
                                                required
                                                minLength={1}
                                                maxLength={200}
                                                onChange={handleInputChange}
                                                value={description}
                                                style={{resize:"none"}}
                                            >
                                            </textarea>
                                        </div>
                                    </div>

                                    {/* Estado del producto */}
                                    <div className="d-flex align-items-center justify-content-center">
                                        <h5 className="mb-0 me-3">Estado</h5>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    name="enabled"
                                                    id="enabled"
                                                    onChange={handleInputChange}
                                                    value="true"
                                                    defaultChecked={activeProduct.enabled === true}
                                                />
                                                <label className="mb-0 ms-2 fs-5">Habilitado</label>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="radio"
                                                    name="enabled"
                                                    id="enabled"
                                                    onChange={handleInputChange}
                                                    value="false"
                                                    defaultChecked={activeProduct.enabled === false}
                                                />
                                                <label className="mb-0 ms-2 fs-5">Deshabilitado</label>
                                            </div>
                                        </div>
                                    </div>
                                    <TaxModal  tax={tax} setTax={setTax}/>  
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