import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import NavComponent from '../NavComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useServicesStore } from '../../hooks'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Swal from 'sweetalert2'
import '../../assets/styles/tableStyle.css'
import HeaderComponent from '../HeaderComponent';

function ServiceListComponent() {

    const navigate = useNavigate();

    const { services, startLoadingServices, setActiveService, startDeletingService, activeService } = useServicesStore();

    useEffect(() => {
        startLoadingServices();
    }, []);

    function checkActiveService(event, service) {

        let checkboxes = document.getElementsByClassName("custom-checkbox");
        let checkbox = event.target;
        let tRow = checkbox.closest("tr");
        for (const item of checkboxes) {
            if (item.id == checkbox.id) {
                if (checkbox.checked) {
                    tRow.classList.add("table-active");
                    setActiveService(service);
                } else {
                    tRow.classList.remove("table-active");
                    setActiveService(null);
                }
            } else {
                item.checked = false;
                item.closest("tr").classList.remove("table-active");
            }
        }
    }

    function deleteService() {
        if (activeService) {
            if (activeService.enabled === true) {
                Swal.fire({
                    title: `¿Seguro que quieres eliminar ${activeService.name}?`,
                    showCancelButton: true,
                    confirmButtonText: 'confirmar',
                    cancelButtonText: 'cancelar',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        startDeletingService();
                        Swal.fire('Servicio Eliminado', '', 'success')
                    }
                });
            } else {
                return Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No puede eliminar un servicio que esté deshabilitado",
                });
            }
        } else {
            Toastify({
                text: "Seleccionar un servicio para eliminar",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
        }
    }

    function editService(event, service) {
        setActiveService(service);
        navigate("/service/editService");
    }

    return (
        <>
            <HeaderComponent/>
            <div className="container-fluid">
                <div className="row">
                    {/* Navbar */}
                    <NavComponent />

                    {/* Table and Buttons */}
                    <div className="col-md-9 col-xl-10 bgGrey ">
                        {/* Button Section */}
                        <section className='d-flex justify-content-center m-3'>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={() => navigate("/service/newService")}>Nuevo</button>
                            <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={deleteService}>Eliminar</button>
                        </section>

                        {/* Table Section */}
                        <section className='d-flex justify-content-center rounded-3 shadow-lg' style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                            <table className="table table-primary">
                                <thead style={{ position: 'sticky', top: 0, borderBottom: '2px solid black' }}>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre Servicio</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Precio Base</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services?.map((service) => (
                                        <tr key={service.id} className='table-primary'>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    id={service.id}
                                                    style={{
                                                        color: "#000000",
                                                        cursor: "pointer",
                                                    }}
                                                    onChange={(event) => checkActiveService(event, service)}
                                                    className="custom-checkbox"
                                                />
                                            </td>
                                            <td>{service.name}</td>
                                            <td className="text-overflow">{service.description}</td>
                                            <td>{"$"+service.basePrice}</td>
                                            <td>{service.enabled ? "habilitado" : "deshabilitado"}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    style={{
                                                        color: "#000000",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={(event) => editService(event, service)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ServiceListComponent;
