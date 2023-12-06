import React, { useEffect, useState } from 'react'
import HeaderComponent from '../HeaderComponent'
import NavComponent from '../NavComponent'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useTotalDiscountsStore } from '../../hooks'
import "toastify-js/src/toastify.css";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import '../../assets/styles/buttonPDFStyle.css'

function TotalDiscountsComponent() {
    const navigate = useNavigate();
    const { totalDiscounts, activeTotalDiscounts, startLoadingTotalDiscounts, setActiveTotalDiscounts } = useTotalDiscountsStore();

    useEffect(
        () => {startLoadingTotalDiscounts()},
        []
    );

    function generatePDF() {
        const doc = new jsPDF('l', 'pt');
        doc.autoTable({ html: '#my-table' })
        doc.save('Descuentos-totales.pdf')
    }

    function showDetails(item) {
        setActiveTotalDiscounts(item)
    }

    let StateForGroupBy = {
        lastClient : null,
        lastService : null,
        newService : null,
        color: "background-color: white"
    }

    function getName(item)
    {
        let name = "";
        if(item.isBusiness)
            name = item.bussinessname;
        else
            name = item.clientname + " " + item.clientlastname;
        return name
    }

    function initGroupBy(item)
    {
        let clientName = "";
        let newClient = getName(item);
        if(newClient !== StateForGroupBy.lastClient)
        {
            StateForGroupBy.lastClient = newClient;
            clientName = newClient;
            StateForGroupBy.newService = item.servicename;
            StateForGroupBy.lastService = item.servicename;
        } 
        else if(StateForGroupBy.lastService !== item.servicename)
        {
            StateForGroupBy.newService = item.servicename;
            StateForGroupBy.lastService = item.servicename;
        }
        else
            StateForGroupBy.newService = "";
        return clientName;
    }

    let id = 0;
    return (
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <NavComponent />

                    <div className='container-fluid mt-4'>
                        {/* Boton back */}
                        <div className='mb-2 d-flex justify-content-between'>
                            <button
                                type="button"
                                className="btn btn-outline-secondary m-0 pt-0 fw-bold fs-5"
                                onClick={() => navigate("/report")}
                            >
                                <IoIosArrowBack style={{ fontSize: '1.7em' }} />
                                Volver
                            </button>
                            <button className="button-pdf" type='button' onClick={generatePDF}>Generar pdf</button>
                        </div>

                        {totalDiscounts.length === 0 ?
                            (
                                <div className='text-center mt-5'>
                                    <h3>Lista Vacía</h3>
                                    <h4 className='lead'>No hubo pedidos con descuentos.</h4>
                                </div>
                            )
                            :
                            (< section className="rounded-3 shadow" style={{maxHeight: "75vh", overflow: "auto"}}>
                                <table className="table table-color m-0 mt-3" id="my-table">
                                    {/* Header de la table */}
                                    <thead
                                        style={{
                                            position: "sticky",
                                            top: 0,
                                            borderBottom: "2px solid black",
                                        }}
                                    >
                                        <tr style={{ textAlign: "center" }}>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Servicio que generó el descuento</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Descuento Total</th>
                                            {/* <th scope="col">#</th> */ }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {                                     
                                            totalDiscounts?.filter(item => item.totaldiscount !== 0)
                                            .map((item) => (
                                                <tr
                                                    key={++id}
                                                    style={{ marginBottom: "0px", textAlign: "center" }}
                                                >
                                                    <td>
                                                        {
                                                            initGroupBy(item)
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            StateForGroupBy.newService
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.orderdate.split("T")[0]
                                                        }
                                                    </td>
                                                    <td>
                                                        ${
                                                            item.totaldiscount.toFixed(2)
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </section>
                            )
                        }

                        {/*<ServiceDiscountDetailModal />*/}


                    </div>

                </div>
            </div>
        </div>
    )
}

export default TotalDiscountsComponent