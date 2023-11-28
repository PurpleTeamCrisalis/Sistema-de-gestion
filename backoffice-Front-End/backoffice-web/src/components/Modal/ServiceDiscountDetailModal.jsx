import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useServicesDiscountStore } from "../../hooks";
import { FaFilePdf } from "react-icons/fa6";
import { jsPDF } from "jspdf";
import encabezadoImage from '../../assets/images/logoEmpresa.png'; // Ajusta la ruta según tu estructura de archivos


export const ServiceDiscountDetailModal = () => {
    const { activeServiceDiscount, startLoadingServicesDiscount, pullActiveServicesDiscount } = useServicesDiscountStore();

    function handleDownloadButton() {
        const doc = new jsPDF();

        // Agrega imagen como encabezado
        doc.addImage(encabezadoImage, 'png', 20, 10, 20, 20);
        doc.setFontSize(20)
        doc.text("Finnegans Backoffice", 40, 23)

        doc.setFontSize(18);
        doc.text('Informe de Detalles', 75, 40);

        doc.setFontSize(12);
        doc.text(`Fecha de Orden: ${activeServiceDiscount.orderdate.split("T")[0]}`, 20, 60);
        doc.text(`Descuento total: $${activeServiceDiscount.totaldiscount.toFixed(2)}`, 20, 70);

        doc.setLineWidth(0.5);
        doc.line(20, 80, 190, 80);

        // Sección de Datos del Cliente
        doc.setFontSize(14);
        doc.text('Datos del Cliente', 20, 90);
        doc.setFontSize(12);
        doc.text(`- Cliente ID: ${activeServiceDiscount.clientid}`, 25, 100);
        doc.text(`- Nombre: ${activeServiceDiscount.clientname} ${activeServiceDiscount.lastname}`, 25, 110);
        doc.text(`- DNI: ${activeServiceDiscount.dni}`, 25, 120);
        doc.text(`- Teléfono: ${activeServiceDiscount.phone}`, 25, 130);
        doc.text(`- Dirección: ${activeServiceDiscount.adress}`, 25, 140);

        // Sección de Datos de la Empresa (si es una empresa)
        if (activeServiceDiscount.isbussiness) {
            doc.setFontSize(14);
            doc.text('Datos de la Empresa', 20, 160);
            doc.setFontSize(12);
            doc.text(`- Nombre de la Empresa: ${activeServiceDiscount.bussinessname}`, 25, 170);
            doc.text(`- CUIT: ${activeServiceDiscount.cuit}`, 25, 180);
            doc.text(`- Inicio de Actividades: ${activeServiceDiscount.startdate.split("T")[0]}`, 25, 190);
        }

        // Sección de Datos del Servicio
        doc.setFontSize(14);
        doc.text('Datos del Servicio', 20, 210);
        doc.setFontSize(12);
        doc.text(`- ID del Servicio: ${activeServiceDiscount.serviceid}`, 25, 220);
        doc.text(`- Nombre del Servicio: ${activeServiceDiscount.servicename}`, 25, 230);
        doc.text(`- Descripción: ${activeServiceDiscount.description}`, 25, 240);
        doc.text(`- Precio Base: $${activeServiceDiscount.baseprice.toFixed(2)}`, 25, 250);
        doc.text(`- Cargo de Soporte: $${activeServiceDiscount.suportcharge.toFixed(2)}`, 25, 260);

        // Guardar o mostrar el PDF
        doc.save(`Informe_${activeServiceDiscount.clientid}_${activeServiceDiscount.serviceid}`);
    }

    return (
        <div
            className="modal fade"
            id="service-discount-detail-modal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {`ID Cliente N°${activeServiceDiscount?.clientid}`}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setTimeout(() => {
                                    pullActiveServicesDiscount
                                }, 1500)
                            }}
                        ></button>
                    </div>

                    <div className="bg-white rounded-3 overflow-hidden m-5">
                        <div className="row">
                            <div className="info-section col-md-4">
                                <strong className="fs-5">Información del Cliente</strong>
                                {activeServiceDiscount?.isbussiness ? (
                                    <ul>
                                        <li>
                                            <strong>Nombre de la Empresa: </strong>
                                            {activeServiceDiscount?.bussinessname}
                                        </li>
                                        <li>
                                            <strong>DNI/CUIT:</strong> {activeServiceDiscount?.cuit}
                                        </li>
                                        <li>
                                            <strong>Inicio de Actividades:</strong> {activeServiceDiscount?.startdate.split("T")[0]}
                                        </li>
                                    </ul>
                                )
                                    :
                                    (
                                        <ul>
                                            <li>
                                                <strong>Nombre: </strong>
                                                {`${activeServiceDiscount?.clientname} ${activeServiceDiscount?.lastname} `}
                                            </li>
                                            <li>
                                                <strong>DNI: </strong>{activeServiceDiscount?.dni}
                                            </li>
                                            <li>
                                                <strong>Teléfono: </strong> {activeServiceDiscount?.phone}
                                            </li>
                                            <li>
                                                <strong>Dirección: </strong> {activeServiceDiscount?.adress}
                                            </li>
                                        </ul>
                                    )
                                }

                            </div>

                            <div className="info-section col-md-4">
                                <strong className="fs-5">Información del Servicio</strong>
                                <ul>
                                    <li>
                                        <strong>Nombre del Servicio:</strong>{" "}
                                        {activeServiceDiscount?.servicename}
                                    </li>
                                    <li>
                                        <strong>Descripción:</strong>{" "}
                                        {activeServiceDiscount?.description}
                                    </li>
                                    <li>
                                        <strong>Precio Base:</strong>{" $"}
                                        {activeServiceDiscount?.baseprice?.toFixed(2)}
                                    </li>
                                    <li>
                                        <strong>Precio Soporte:</strong>{" $"}
                                        {activeServiceDiscount?.suportcharge?.toFixed(2)}
                                    </li>
                                </ul>
                            </div>

                            {activeServiceDiscount?.isbussiness ? (
                                <div className="info-section col-md-4">
                                    <strong className="fs-5">Información del Responsable</strong>
                                    <ul>
                                        <li>
                                            <strong>Nombre: </strong>
                                            {`${activeServiceDiscount?.clientname} ${activeServiceDiscount?.lastname} `}
                                        </li>
                                        <li>
                                            <strong>DNI: </strong>{activeServiceDiscount?.dni}
                                        </li>
                                        <li>
                                            <strong>Teléfono: </strong> {activeServiceDiscount?.phone}
                                        </li>
                                        <li>
                                            <strong>Dirección: </strong> {activeServiceDiscount?.adress}
                                        </li>
                                    </ul>
                                </div>
                            ) :
                                ("")
                            }
                        </div>
                    </div>

                    <div className="modal-footer d-flex justify-content-center">
                        <button
                            type="button"
                            className="border border-3 border-primary rounded"
                            onClick={handleDownloadButton}
                        >
                            <div className="m-1">
                                <label
                                    className="me-2"
                                    style={{
                                        color: "#000000",
                                        cursor: "pointer",
                                    }}
                                >
                                    Descargar
                                </label>
                                <FaFilePdf />
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>

    );
};
