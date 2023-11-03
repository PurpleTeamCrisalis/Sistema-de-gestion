import React from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm, useProductsStore } from '../../hooks'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const formDTO = {
    name: "",
    description: "",
    basePrice: 0
}

function NewProductComponent() {
    const navigate = useNavigate();
    const { startAddingProduct, products } = useProductsStore();
    const { name, description, basePrice, handleInputChange, clearForm } = useForm(formDTO);

    function addProduct(event) {
        event.preventDefault();

        // Objeto del producto
        const product = {
            name,
            description,
            basePrice: parseFloat(basePrice),
        };

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
            startAddingProduct(product);
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
                                <h3 className="fs-4 text-light">Añadir Producto</h3>
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
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="description" className="form-label">Descripción</label>
                                            <input
                                                type="text"
                                                name="description"
                                                id="description"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={description}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="dni" className="form-label">Precio Base</label>
                                            <input
                                                type="text"
                                                name="basePrice"
                                                id="basePrice"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={basePrice}
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
        </>
    )
}

export default NewProductComponent