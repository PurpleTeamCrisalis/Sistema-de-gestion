import React from 'react'
import NavComponent from '../NavComponent'
import HeaderComponent from '../HeaderComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaChartPie, FaListAlt, FaPercent } from "react-icons/fa";


function ReportListComponent() {

    const dashboard = [
        {
            id: 1,
            title: 'Servicios con Mayor Descuento',
            image: <FaChartPie />,
            navigate: () => navigate("")
        },
        {
            id: 2,
            title: 'Pedidos', // Pedidos por Cliente, Servicios y producto
            image: < FaListAlt />,
            navigate: () => navigate("")
        },
        {
            id: 3,
            title: "Descuentos Totales",//por Cliente, Servicio y Fecha
            image: < FaPercent />,
            navigate: () => navigate("")
        }
    ]

    return (
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <div className="container-fluid mainContainer">
                        <div className="secondContainer">
                            <NavComponent />
                            <section className="mx-auto mt-5 d-flex" style={{ flexDirection: "column" }}>
                                <h1 className='mx-auto mt-5 h2'>Informes</h1>
                                <div className='d-flex justify-content-around' style={{ marginTop: "-2rem" }}>
                                    {dashboard.map((item) => (
                                        <div onClick={() => item.navigate()} key={item.id} className="e-card playing mx-5">
                                            <div className="image"></div>
                                            <div className="wave"></div>
                                            <div className="wave"></div>
                                            <div className="wave"></div>
                                            <div className="infotop" style={{ marginTop: "-5rem" }}>
                                                <div style={{ fontSize: '2em' }}>
                                                    {item.image}
                                                </div>
                                                <div className='mt-4 align-self-center'>
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ReportListComponent