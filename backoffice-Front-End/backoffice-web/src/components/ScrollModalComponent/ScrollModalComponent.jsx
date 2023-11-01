import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNewOrderStore } from '../../hooks';

export const ScrollModalComponent = ({ list }) =>
{

    const {addProducts, addServices} = useNewOrderStore();

    const productsDto = [
        {
            id: 1,
            basePrice: 200,
            description: "LoremLoremLoremLoremLoremLoremLoremLorem",
            name: "Zapatilla",
            type: "Product"
        },
        {
            id: 2,
            basePrice: 200,
            description: "djasldjashdjasdjhkasjhkdgasjd",
            name: "Medias",
            type: "Product"
        },
        {
            id: 3,
            basePrice: 200,
            description: "description",
            name: "Pantalones",
            type: "Product"
        },
    ];
    const servicesDto = [
        {
            id: 4,
            basePrice: 200,
            description: "",
            name: "Limpieza",
            type: "Service"
        },
        {
            id: 5,
            basePrice: 200,
            description: "",
            name: "Reparación",
            type: "Service"
        },
    ];

    const bienes = [...productsDto, ...servicesDto]

    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);

    function checkActiveItem(event, bien)
    {
        let checkboxes = document.getElementsByClassName("custom-checkbox");
        let checkbox = event.target;
        let tRow = checkbox.closest("tr");
        for (const item of checkboxes)
        {
            if (item.id == checkbox.id)
            {
                if (checkbox.checked)
                {
                    tRow.classList.add("table-active");
                    bien.type === "Product"
                        ? setProducts([...products, bien])
                        : setServices([...services, bien]);
                } else
                {
                    tRow.classList.remove("table-active");
                    bien.type === "Product"
                        ? setProducts(
                            [...products].filter((product) => product.id !== bien.id)
                        )
                        : setServices(
                            [...services].filter((service) => service.id !== bien.id)
                        );
                }
            }
        }
    }

    function handleButtonClick()
    {
        // Cierra modal.
        // Despacho la Funcion para cargar servicios.
        // dispatch(onAddService(services))
        addProducts(products);
        addServices(services);
        // Despacho la Funcion para cargar productos
        // dispatch(onAddProduct(products))



        console.log({ products, services })

    }

    function cleanCheckBoxes(event, item)
    {

        let checkboxes = document.getElementsByClassName("custom-checkbox");
        let tRow = checkbox.closest("tr");
        for (const item of checkboxes)
        {
            if (item.id == checkbox.id)
            {
                if (checkbox.checked)
                {
                    tRow.classList.add("table-active");
                    setActiveUser(user);
                } else
                {
                    tRow.classList.remove("table-active");
                    setActiveUser(null);
                }
            } else
            {
                item.checked = false;
                item.closest("tr").classList.remove("table-active");
            }
        }
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body modal-dialog-scrollable">
                            <div className="bg-white rounded-3 overflow-hidden">
                                <table className="table table-hover">
                                    {/* Header de la table */}
                                    <thead
                                        style={{
                                            position: "sticky",
                                            top: 0,
                                            borderBottom: "2px solid black",
                                        }}
                                    >
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bienes.map((bien) => (
                                            <tr key={bien.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        id={bien.id}
                                                        style={{
                                                            color: "#000000",
                                                            cursor: "pointer",
                                                        }}
                                                        onChange={(event) =>
                                                            checkActiveItem(event, bien)
                                                        }
                                                        className="custom-checkbox"
                                                    />
                                                </td>
                                                <td>{bien.type}</td>
                                                <td>{bien.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleButtonClick} data-bs-dismiss="modal">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
