import React from 'react'
import NavComponent from '../NavComponent'
import { useNavigate } from 'react-router-dom'
import { useForm, useProductsStore } from '../../hooks';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "../HeaderComponent";

function EditProductComponent() {
    const navigate = useNavigate();
    const { startUpdatingProduct, activeProduct, setActiveProduct, products } = useProductsStore();
    const { name, description, basePrice, enabled, handleInputChange, emptyValidation } = useForm({
        name: activeProduct?.name,
        description: activeProduct?.description,
        basePrice: activeProduct?.basePrice,
        enabled: activeProduct?.enabled,
        id: activeProduct?.id,
    });

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
            startUpdatingProduct(productaux)
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
                            <div className="text-center py-4">
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
                                                name='name'
                                                id='name'
                                                onChange={handleInputChange}
                                                value={name}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="description" className="form-label">Descripción</label>
                                            <input
                                                type="text"
                                                name='description'
                                                id='description'
                                                onChange={handleInputChange}
                                                value={description}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="basePrice" className="form-label">Precio Base</label>
                                            <input
                                                type="text"
                                                name='basePrice'
                                                id='basePrice'
                                                onChange={handleInputChange}
                                                value={basePrice}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
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