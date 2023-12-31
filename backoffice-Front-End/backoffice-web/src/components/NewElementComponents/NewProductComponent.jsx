import React, { useEffect, useState } from "react";
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useChargesStore, useForm, useProductsStore } from '../../hooks'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import "../../assets/styles/inputStyle.css"
import HeaderComponent from "../HeaderComponent";
import TaxModal from '../Modal/TaxModal'


const formDTO = {
    name: "",
    description: "",
    basePrice: 0
}

function NewProductComponent() {
    const navigate = useNavigate();
    const { startAddingProduct, products } = useProductsStore();
    const { charges, startLoadingCharges } = useChargesStore();
    const { name, description, basePrice, handleInputChange, clearForm, emptyValidation } = useForm(formDTO);
    const [tax, setTax] = useState([]); //Guarda los impuestos seleccionados por id


    useEffect(() => {
        if (charges.length === 0) startLoadingCharges();
    }, []);

    function addProduct(event) {
        event.preventDefault();

        // Objeto del producto
        const product = {
            name,
            description,
            basePrice: parseFloat(basePrice),
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

        // Comprueba existencia de producto
        const productoExiste = products?.find(productList => { return productList.name === product.name });
        if (productoExiste) {
            Toastify({
                text: "El producto ya existe",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: El producto ya existe");
        }

        try {
            startAddingProduct({ ...product, taxes: tax });
            setTax([]); //Vacia los datos de impuestos
            clearForm();
            Toastify({
                text: "Producto Creado",
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
                        <section className="container bg-primary rounded-3 mt-4 mb-4 form-section" style={{ minHeight: "70vh", width: "95%" }}>
                            <div className="text-center py-4">
                                <h3 className="fs-4 text-light">Añadir Producto</h3>
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
                                onClick={addProduct}
                            >
                                Añadir
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

export default NewProductComponent